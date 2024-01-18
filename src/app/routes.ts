import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


export const canActivate = (
  authGuard: AuthGuard = inject(AuthGuard)
) => authGuard.isLoggedIn();

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas no protegidas por el guard
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },

  // Rutas protegidas por el guard
  {
    path: 'clientes',
    loadComponent: () =>
      import('./components/clientes/clientes.component').then(
        (c) => c.ClientesComponent
      ),
    // canActivate: [() => canActivate()],
  },
  // {
  //   path: 'facturas',
  //   loadComponent: () =>
  //     import('./components/facturas/facturas.component').then(
  //       (c) => c.FacturasComponent
  //     ),
    // canActivate: [() => canActivate()],
  // },
  {
    path: 'proveedores',
    loadComponent: () =>
      import('./components/proveedores/proveedores.component').then(
        (c) => c.ProveedoresComponent
      ),
    canActivate: [() => canActivate()],
  },
  {
    path: 'facturas',
    loadComponent: () =>
      import('./components/factura-avanzado/factura-avanzado.component').then(
        (c) => c.FacturaAvanzadoComponent
      ),
    canActivate: [() => canActivate()],
  },

  // 404NotFound
  // { path: '**', redirectTo: '/404', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
