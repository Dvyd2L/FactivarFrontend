import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas no protegidas por el guard
  {
    path: 'home',
    title: 'Inicio | Factivar',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: 'login',
    title: 'Login | Factivar',
    loadComponent: () =>
      import('./pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
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
    title: 'Clientes | Factivar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/clientes/clientes.component').then(
        (c) => c.ClientesComponent
      ),
  },
  {
    path: 'clientes/:pk',
    title: 'Clientes | Factivar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/detail-customer/detail-customer.component').then(
        (c) => c.DetailCustomerComponent
      ),
  },
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
      import('./pages/factura-avanzado/factura-avanzado.component').then(
        (c) => c.FacturaAvanzadoComponent
      ),
  },
  {
    path: 'facturas/:pk',
    title: 'Factura:pk | Factivar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/invoice-template/invoice-template.component').then(
        (c) => c.InvoiceTemplateComponent
      ),
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
