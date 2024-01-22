import { Component, inject } from '@angular/core';
import { BotonAccesosComponent } from '../boton-accesos/boton-accesos.component';
import { IUserPayload } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth/auth.service';
import { SocialAuthService } from '@app/services/auth/social-auth.service';
import { UserService } from '@app/services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [BotonAccesosComponent, AvatarModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  providers: [],
})
export class AvatarComponent {
  private userService = inject(UserService<IUserPayload>);
  private authService = inject(AuthService);
  private socialAuthService = inject(SocialAuthService);
  user!: IUserPayload;

  ngOnInit(): void {
    // Suscribirse al Observable del usuario
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => console.error(err),
    });
  }

  cerrarSesion() {
    if (this.socialAuthService.getProfile()) {
      this.socialAuthService.logout();
    } else {
      this.authService.logout({ email: this.user.Email });
    }
  }
}
