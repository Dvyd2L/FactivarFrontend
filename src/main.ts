import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { appConfig } from './config/app.config';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
