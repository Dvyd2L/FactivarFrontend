import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BotonAccesosComponent } from '../boton-accesos/boton-accesos.component';
import { AuthService } from '@app/services/auth/auth.service';
import { IRegisterUser } from '@app/interfaces/user';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    BotonAccesosComponent,
    PasswordInputComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService, AuthService],
})
export class RegisterComponent {
  @ViewChild('fRegister') fRegister!: NgForm;
  infoRegister: IRegisterUser = {
    nombre: '',
    apellidos: '',
    avatar: undefined,
    email: '',
    telefono: '',
    password: '',
  };
  password: string = '';

  setPassword(input:string) {
    this.infoRegister.password = input;
  }

  setRepeatPassword(input:string) {
    this.password = input;
  }
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      this.infoRegister.avatar = file;
    }
  }

  register() {
    this.authService.register(this.infoRegister).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.msg,
        });
      },
    });
  }

  validPass() {
    if (this.infoRegister.password !== this.password) {
      console.log('Las contraseñas no coinciden');
    }
  }
}
