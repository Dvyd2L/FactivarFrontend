import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment.development';

/**
 * Obtiene los datos de una API mediante una solicitud GET.
 * @param controllerPath - Ruta del controlador de la API.
 * @returns Una promesa que se resuelve con los datos obtenidos de la API.
 * @template T - Tipo de datos esperado en la respuesta de la API.
 */
export const getData = <T>(controllerPath: string, http = inject(HttpClient)) =>
  http.get<T>(`${environment.urlAPI}${controllerPath}`);

/**
 * Obtiene los datos de un recurso específico de una API mediante una solicitud GET.
 * @param controllerPath - Ruta del controlador de la API.
 * @returns Una promesa que se resuelve con los datos obtenidos del recurso específico de la API.
 * @template T - Tipo de datos esperado en la respuesta de la API.
 */
export const getDataByPk = <T>(controllerPath: string) => {
  const http = inject(HttpClient);
  const route = inject(ActivatedRoute);
  const { pk } = route.snapshot.params;

  return http.get<T>(`${environment.urlAPI}api/${controllerPath}/${pk}`);
};
