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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideOAuthClient(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    {
      provide: LOCALE_ID /** imported from @angular/core */,
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
  ],
};
