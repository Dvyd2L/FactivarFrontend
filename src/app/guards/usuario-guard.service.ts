import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuardService {
  constructor(private router: Router) {}

  isLoggedIn() {
    const user = sessionStorage.getItem('usuario');

    if (user) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
