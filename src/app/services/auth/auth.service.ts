import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ILoginResponse,
  ILoginUser,
  IRegisterUser,
  IUserPayload,
} from '@app/interfaces/user';
import { IdxDbService } from '@app/db/idx-db.service';
import { DbNameEnum, DbStoreNameEnum } from '@app/db/types/enums';

/**
 * Servicio de autenticación.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private idxDB = inject(IdxDbService);
  private http = inject(HttpClient);
  private userService = inject(UserService<IUserPayload>);
  private router = inject(Router);
  private urlAPI: string = environment.urlAPI + 'auth';
  private authDB!: IDBDatabase;
  private userStoreDB!: IDBObjectStore;
  private tokenStoreDB!: IDBObjectStore;

  constructor() {
    this.idxDB.createDb(DbNameEnum.Auth).subscribe({
      next: (idxDB) => (this.authDB = idxDB),
      error: (err) => console.error(err),
    });

    this.idxDB
      .createStore(DbNameEnum.Auth, {
        name: DbStoreNameEnum.User,
      })
      .subscribe({
        next: (idxDBObjectStore) => (this.userStoreDB = idxDBObjectStore),
        error: (err) => console.error(err),
      });

    this.idxDB
      .createStore(DbNameEnum.Auth, {
        name: DbStoreNameEnum.Token,
      })
      .subscribe({
        next: (idxDBObjectStore) => (this.tokenStoreDB = idxDBObjectStore),
        error: (err) => console.error(err),
      });
  }

  /**
   * Realiza el inicio de sesión.
   * @param credenciales Las credenciales del usuario.
   */
  public login(credenciales?: ILoginUser) {
    return this.http
      .post<ILoginResponse>(`${this.urlAPI}/login`, credenciales)
      .subscribe({
        next: ({ token }) => {
          const helper = new JwtHelperService();
          const payload = helper.decodeToken(token) as IUserPayload;
          console.log({ payload });
          console.log({ token });

          this.userService.updateUser({
            ...payload,
            token,
          });
          this.idxDB
            .create<IUserPayload>(DbStoreNameEnum.User, {
              key: payload.Email,
              data: { ...payload },
            })
            .subscribe({
              next: (data) => console.log({ msg:'Datos creados en DbStore_User', data }),
              error: (err) => console.error(err),
            });
          this.idxDB.read<IUserPayload>(DbStoreNameEnum.User).subscribe({
            next: (data) => console.log({ msg:'Datos leidos en DbStore_User', data }),
            error: (err) => console.error(err),
          });
          this.idxDB
            .create<string>(DbStoreNameEnum.Token, {
              key: payload.Email,
              data: token,
            })
            .subscribe({
              next: (data) => console.log({ msg:'Datos creados en DbStore_Token', data }),
              error: (err) => console.error(err),
            });
          this.idxDB.read<IUserPayload>(DbStoreNameEnum.Token).subscribe({
            next: (data) => console.log({ msg:'Datos leidos en DbStore_Token', data }),
            error: (err) => console.error(err),
          });
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }

  /**
   * Realiza el inicio de sesión con Google.
   * @param idToken El token de autenticación de Google.
   */
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

          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }

  /**
   * Cierra la sesión del usuario.
   * @param email El correo electrónico del usuario.
   * @returns Una solicitud HTTP para cerrar la sesión.
   */
  public logout({ email }: { email: string }) {
    this.userService.clearUser();
    this.router.navigate(['/login']);

    return this.http.post(`${this.urlAPI}/logout`, { email });
  }

  /**
   * Registra un nuevo usuario.
   * @param registro Los datos de registro del usuario.
   * @returns Un observable con los datos del usuario registrado.
   */
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

  /**
   * Actualiza el token de acceso.
   * @returns Una solicitud HTTP para actualizar el token de acceso.
   */
  public refreshToken() {
    const currentUser = this.userService.userValue;
    const token = currentUser.token;
    //const token = currentUser.refreshToken;  ARREGLAR ESTO

    return this.http.post<IUserPayload>(`${this.urlAPI}/auth/refreshtoken`, {
      token,
    });
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

  /**
   * Limpia los datos de usuario almacenados y redirige a la página de inicio de sesión.
   */
  public clearStorage() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
