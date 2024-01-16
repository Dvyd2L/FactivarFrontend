import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '@app/helpers/storage';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  isLoggedIn() {
    const user = StorageHelper.getItem(environment.storage.user, true);

    if (user) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
