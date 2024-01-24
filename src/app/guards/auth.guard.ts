/**
 * Función que actúa como guardia de autenticación para las rutas en Angular.
 * Comprueba si el usuario está autenticado antes de permitir el acceso a una ruta.
 * Si el usuario no está autenticado, redirige a la página de inicio de sesión.
 * @returns {boolean} - Devuelve true si el usuario está autenticado y puede acceder a la ruta, de lo contrario devuelve false.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageHelper } from '@app/helpers/storage';
import { environment } from '@environments/environment.development';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = StorageHelper.getItem(environment.storage.user, true);

  if (user) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
