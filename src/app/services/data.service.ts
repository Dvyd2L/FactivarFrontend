import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment.development';

export const getData = <T>(controllerPath: string) => {
  const http = inject(HttpClient);

  return http.get<T>(`${environment.urlAPI}api/${controllerPath}`);
};

export const getDataByPk = <T>(controllerPath: string) => {
  const http = inject(HttpClient);
  const route = inject(ActivatedRoute);
  const { pk } = route.snapshot.params;

  return http.get<T>(`${environment.urlAPI}api/${controllerPath}/${pk}`);
};
