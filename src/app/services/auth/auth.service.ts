import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ILoginResponse,
  ILoginUser,
  IRegisterUser,
  IUserPayload,
} from '@app/interfaces/user';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAPI: string = environment.urlAPI + 'auth';
  private http = inject(HttpClient);
  private userService = inject(UserService<IUserPayload>);
  private router = inject(Router)
  // private messageService = inject(MessageService);

  public login(credenciales?: ILoginUser) {
    return this.http
      .post<ILoginResponse>(`${this.urlAPI}/login`, credenciales)
      .subscribe({
        next: (data) => {
          const helper = new JwtHelperService();
          const payload = helper.decodeToken(data.token) as IUserPayload;

          this.userService.updateUser({
            ...payload,
            token: data.token,
          });
          console.log({ payload });
          console.log({ data });
          this.router.navigate(['/clientes']);
        },
        error: (err) => /* this.handleHttpError(err) */ console.error(err),
        complete: () => {},
      });
  }

  public loginWithGoogle(idToken?: string) {
    return this.http
      .post<ILoginResponse>(`${this.urlAPI}/google-authenticate`, idToken)
      .subscribe({
        next: (data) => {
          // const helper = new JwtHelperService();
          // const payload = helper.decodeToken(data.token) as IUserPayload;

          this.userService.updateUser({
            // ...payload,
            ...this.userService.userValue,
            token: data.token,
          });

          this.router.navigate(['/clientes']);
        },
        error: (err) => /* this.handleHttpError(err) */ console.error(err),
        complete: () => {},
      });
  }

  public logout({ email }: { email: string }) {
    this.userService.clearUser();
    this.router.navigate(['/login']);

    return this.http.post(`${this.urlAPI}/logout`, { email });
  }

  public register(registro: IRegisterUser): Observable<IRegisterUser> {
    const formData = new FormData();

    formData.append('nombre', registro.nombre);
    formData.append('apellidos', registro.apellidos);
    formData.append('email', registro.email);
    formData.append('password', registro.password);

    if (registro.telefono) {
      formData.append('telefono', registro.telefono.toString());
    }

    if (registro.avatar && registro.avatar instanceof File) {
      formData.append('avatar', registro.avatar, registro.avatar.name);
    }

    return this.http.post<IRegisterUser>(`${this.urlAPI}/register`, formData);
  }

  public refreshToken() {
    const currentUser = this.userService.userValue;
    //const token = currentUser.refreshToken;  ARREGLAR ESTO
    const token = currentUser.token;

    return this.http
      .post<IUserPayload>(`${this.urlAPI}/auth/refreshtoken`, { token })
      // .subscribe({
      //   next: (data) => {
      //     this.userService.updateUser({
      //       ...data,
      //     });

      //     this.router.navigate(['/clientes']);
      //   },
      //   error: (err) => this.handleHttpError(err),
      //   complete: () => {},
      // });
  }

  public clearStorage() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  // private handleHttpError(error: HttpErrorResponse) {
  //   console.error(error);

  //   if (error instanceof HttpErrorResponse) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: error.error.msg,
  //     });
  //   }
  // }
}
