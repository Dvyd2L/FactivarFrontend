import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IUserPayload } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth/auth.service';
import { SocialAuthService } from '@app/services/auth/social-auth.service';
import { UserService } from '@app/services/user.service';
import { BotonAccesosComponent } from '../boton-accesos/boton-accesos.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BotonAccesosComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: [AuthService, SocialAuthService, UserService],
})
export class NavBarComponent implements OnInit {
  user!: IUserPayload;
  
  constructor(
    private userService: UserService,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse al Observable del usuario
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => console.error(err),
    });
  }

  getToken(){
    console.log(this.socialAuthService.getIdToken())
  }

  cerrarSesion() {
    if (this.socialAuthService.getProfile()) {
      this.socialAuthService.logout();
    } else {
      this.authService.logout({ email: this.user.Email });
    }
  }
}
