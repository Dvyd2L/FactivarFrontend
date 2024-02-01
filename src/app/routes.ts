/**
 * @fileoverview Este archivo contiene la configuración de las rutas de la aplicación.
 * Las rutas están definidas utilizando el enrutador de Angular.
 * Algunas rutas están protegidas por el guardia de autenticación.
 */

import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

/**
 * Las rutas de la aplicación.
 * Cada ruta tiene una URL, un título y un componente que se carga dinámicamente.
 * Algunas rutas están protegidas por el guardia de autenticación.
 */
export const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },

  // Rutas no protegidas por el guard
  {
    path: '',
    title: 'Inicio | Factivar',
    loadComponent: () =>
      import('./pages/home/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: 'login',
    title: 'Login | Factivar',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    title: 'Register | Factivar',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },

  // Rutas protegidas por el guard
  {
    path: 'clientes',
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        title: 'Clientes | Factivar',
        loadComponent: () =>
          import('./pages/clientes/clientes.component').then(
            (c) => c.ClientesComponent
          ),
      },
      {
        path: 'detail/:pk',
        title: 'Detalles del Cliente | Factivar',
        loadComponent: () =>
          import('./pages/detail-customer/detail-customer.component').then(
            (c) => c.DetailCustomerComponent
          ),
      },
    ],
  },
  {
    path: 'usuarios',
    title: 'Usuarios | Factivar',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
  },
  {
    path: 'facturas',
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        title: 'Facturas | Factivar',
        loadComponent: () =>
          import('./pages/factura-avanzado/factura-avanzado.component').then(
            (c) => c.FacturaAvanzadoComponent
          ),
      },
      {
        path: 'detail/:pk',
        title: 'Detalles de la Factura | Factivar',
        loadComponent: () =>
          import('./pages/invoice-template/invoice-template.component').then(
            (c) => c.InvoiceTemplateComponent
          ),
      },
    ],
  },

  // 404NotFound
  {
    path: '**',
    title: '404 | Factivar',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
