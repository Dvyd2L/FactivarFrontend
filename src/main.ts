/**
 * Archivo principal de la aplicación.
 */
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { appConfig } from './config/app.config';

/**
 * Registra los datos de localización en español.
 */
registerLocaleData(localeEs);

/**
 * Inicia la aplicación.
 * @param {typeof AppComponent} component - El componente raíz de la aplicación.
 * @param {any} config - La configuración de la aplicación.
 */
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
