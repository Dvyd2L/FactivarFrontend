import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas no protegidas por el guard
  {
    path: 'home',
    title: 'Inicio | Factivar',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: 'login',
    title: 'Login | Factivar',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    title: 'Register | Factivar',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },

  // Rutas protegidas por el guard
  {
    path: 'clientes',
    title: 'Clientes | Factivar',
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
    title: 'Proveedores | Factivar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/proveedores/proveedores.component').then(
        (c) => c.ProveedoresComponent
      ),
  },
  {
    path: 'facturas',
    title: 'Facturas | Factivar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/factura-avanzado/factura-avanzado.component').then(
        (c) => c.FacturaAvanzadoComponent
      ),
  },

  // 404NotFound
  // { path: '**', redirectTo: '/404', pathMatch: 'full' },
  {
    path: '**',
    title: '404 | Factivar',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
