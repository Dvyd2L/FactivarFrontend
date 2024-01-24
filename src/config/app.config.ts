/**
 * Configuración de la aplicación.
 */
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from '@app/routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorFn } from '@app/interceptors/token-fn.interceptor';
import { errorInterceptorFn } from '@app/interceptors/error-fn.interceptor';

/**
 * Configuración de la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor del enrutador de la aplicación.
     */
    provideRouter(routes),
    /**
     * Proveedor del cliente HTTP con interceptores.
     */
    provideHttpClient(withInterceptors([authInterceptorFn])),
    /**
     * Proveedor del cliente OAuth2.
     */
    provideOAuthClient(),
    /**
     * Importa los proveedores del módulo BrowserModule y BrowserAnimationsModule.
     */
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    {
      /**
       * Proveedor del identificador de localización.
       */
      provide: LOCALE_ID /** imported from @angular/core */,
      /**
       * Valor del identificador de localización.
       */
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
  ],
};
