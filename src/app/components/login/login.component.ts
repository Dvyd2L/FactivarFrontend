import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { BotonAccesosComponent } from '../boton-accesos/boton-accesos.component';
import { ILoginUser } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import { FacebookSigninComponent } from '../facebook-signin/facebook-signin.component';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    BotonAccesosComponent,
    PasswordInputComponent,
    GoogleSigninComponent,
    FacebookSigninComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService, AuthService],
})
export class LoginComponent {
  infoLogin: ILoginUser = {
    email: '',
    password: '',
  };
  // showPassword: boolean = false;

  // showHidePassword(checked: boolean) {
  //   this.showPassword = checked;
  // }
  setPassword(value:string) {
    this.infoLogin.password = value;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  login() {
    console.log(this.infoLogin)
    this.authService.login(this.infoLogin)
    // .subscribe({
    //   next: (data) => {
    //     sessionStorage.setItem(environment.storage.user, JSON.stringify(data));
    //     this.router.navigateByUrl('clientes');
    //   },
    //   error: (err) => {
    //     console.warn(err);

    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: err.error.msg,
    //     });
    //   },
    // });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
