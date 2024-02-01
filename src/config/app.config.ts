import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideRouter,
  withDebugTracing,
  withRouterConfig,
} from '@angular/router';
import { routes } from '@app/routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorFn } from '@app/interceptors/token-fn.interceptor';
import { provideOAuthProvidersConfig } from './oauth.config';
import { provideLocale } from './locale.config';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './indexed-db.config';
// import { NgxGistModule } from '@proangular/ngx-gist';

/**
 * Configuración de la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor del enrutador de la aplicación.
     */
    provideRouter(
      routes,
      withDebugTracing(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
        // urlUpdateStrategy: 'deferred',
      })
    ),
    /**
     * Proveedor del cliente HTTP con interceptores.
     */
    provideHttpClient(withInterceptors([authInterceptorFn])),
    /**
     * Proveedor del cliente OAuth2.
     */
    provideOAuthClient(),
    provideOAuthProvidersConfig(), // custom method
    /**
     * Importa los proveedores del módulo BrowserModule y BrowserAnimationsModule.
     */
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      NgxIndexedDBModule.forRoot(dbConfig) // Importa NgxIndexedDBModule y configúralo
      // NgxGistModule // Importa NgxGistModule
    ),
    provideLocale(), // custom method
  ],
};
