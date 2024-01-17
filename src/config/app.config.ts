import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ErrorInterceptor } from '@app/interceptors/error.interceptor';
import { routes } from '@app/routes';
// import { JwtInterceptor } from '@auth0/angular-jwt';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from '@app/interceptors/token.interceptor';
// import { SocialAuthService } from '@app/services/auth/social-auth.service';
// import { FACEBOOK_OAUTH_CONFIG, GOOGLE_OAUTH_CONFIG, facebookOAuthConfig, googleOAuthConfig } from './tokens/oauth-conection.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, TokenInterceptor),
    {
      provide: LOCALE_ID /** imported from @angular/core */,
      useValue: 'es-ES' /** default locale fixed to es-ES */,
    },
    //interceptors (NO VAN)
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    // Inicio de sesion con redes sociales
    // {
    //   provide: GOOGLE_OAUTH_CONFIG,
    //   useValue: googleOAuthConfig,
    //   // multi: true,
    // },
    // {
    //   provide: FACEBOOK_OAUTH_CONFIG,
    //   useValue: facebookOAuthConfig,
    //   multi: true,
    // },
    // {
    //   provide: GOOGLE_OAUTH_CONFIG,
    //   useClass: SocialAuthService,
    //   // multi: true,
    // },
    // {
    //   provide: FACEBOOK_OAUTH_CONFIG,
    //   useClass: SocialAuthService,
    //   multi: true,
    // },
  ],
};
