import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { handle401Error } from '@app/helpers/addTokenToRequest';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Interceptor de errores. Esta función intercepta las solicitudes HTTP,
 * maneja los errores que puedan ocurrir y, en caso de un error 401,
 * llama a la función handle401Error para manejarlo.
 *
 * @param {HttpRequest} req - La solicitud HTTP que se va a manejar
 * @param {HttpHandler} next - El siguiente manejador en la cadena de manejadores
 * @returns {Observable<HttpEvent<any>>} Un observable que emite el resultado de manejar la solicitud
 */
export const errorInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandler
): Observable<HttpEvent<any>> =>
  next.handle(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>err).status) {
          case 401:
            return handle401Error(req, next, err);
          default:
            return throwError(() => err);
        }
      } else {
        return throwError(() => new Error(err));
      }
    })
  );
