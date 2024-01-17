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

  constructor(private authService: AuthService) {}

  setPassword(value: string) {
    this.infoLogin.password = value;
  }

  login() {
    console.log(this.infoLogin);
    this.authService.login(this.infoLogin);
  }

  loginWithGoogle(idToken: string) {
    this.authService.loginWithGoogle(idToken);
  }
}
