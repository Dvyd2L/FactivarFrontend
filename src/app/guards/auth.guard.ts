import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '@app/helpers/storage';
import { environment } from '@environments/environment.development';

export const authGuard = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem(environment.storage.user, true);

  if (user) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
