/**
 * Componente de inicio de sesión.
 */
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { BotonAccesosComponent } from '../../components/boton-accesos/boton-accesos.component';
import { ILoginUser } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import { FacebookSigninComponent } from '../../components/facebook-signin/facebook-signin.component';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';

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
  /**
   * Información de inicio de sesión.
   */
  infoLogin: ILoginUser = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  /**
   * Establece la contraseña del usuario.
   * @param value - Valor de la contraseña.
   */
  setPassword(value: string) {
    this.infoLogin.password = value;
  }

  /**
   * Realiza el inicio de sesión.
   */
  login() {
    console.log(this.infoLogin);
    this.authService.login(this.infoLogin);
  }

  /**
   * Realiza el inicio de sesión con Google.
   * @param idToken - Token de identificación de Google.
   */
  loginWithGoogle(idToken: string) {
    this.authService.loginWithGoogle(idToken);
  }
}
