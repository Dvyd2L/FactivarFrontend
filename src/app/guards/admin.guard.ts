import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '@app/helpers/storage';
import { RolesEnum } from '@app/interfaces/enums/roles';
import { IUserPayload } from '@app/interfaces/user';

export const adminGuard = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem<IUserPayload>('usuario');

  if (user?.Role === RolesEnum.Admin) {
    return true;
  }
  router.navigate(['chat']);
  return false;
};
