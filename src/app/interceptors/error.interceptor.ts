import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { filter, catchError, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { IUserPayload } from '@app/interfaces/user';

/**
 * Interceptor de errores para manejar respuestas HTTP con errores.
 */
@Injectable({ 
  providedIn: 'root' 
})
export class ErrorInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null!);

  /**
   * Intercepta las solicitudes HTTP y maneja los errores.
   * @param request La solicitud HTTP.
   * @param next El siguiente controlador HTTP.
   * @returns Un Observable de HttpEvent.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(request, next, err);
            default:
              return throwError(() => err);
          }
        } else {
          return throwError(() => new Error(err));
        }
      })
    );
  }

  /**
   * Agrega el token de autorización a la solicitud HTTP.
   * @param request La solicitud HTTP.
   * @param token El token de autorización.
   * @returns Una nueva instancia de HttpRequest con el token agregado.
   */
  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  /**
   * Maneja el error 401 (Unauthorized).
   * @param request La solicitud HTTP.
   * @param next El siguiente controlador HTTP.
   * @param err El error HTTP.
   * @returns Un Observable de HttpEvent.
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler, err: any): Observable<HttpEvent<any>> {
    if (this.isTokenError(request, err)) {
      return this.handleTokenError(request, next, err);
    }
  
    if (err.headers.has('Token-Expired')) {
      return this.handleExpiredToken(request, next);
    }
  
    this.authService.clearStorage();
    location.reload();
  
    return throwError(() => new Error(err));
  }
  
  /**
   * Verifica si el error está relacionado con el token de autorización.
   * @param request La solicitud HTTP.
   * @param err El error HTTP.
   * @returns `true` si el error está relacionado con el token de autorización, de lo contrario `false`.
   */
  private isTokenError(request: HttpRequest<any>, err: any): boolean {
    return request.url.includes('refreshtoken') || request.url.includes('login');
  }
  
  /**
   * Maneja el error relacionado con el token de autorización.
   * @param request La solicitud HTTP.
   * @param next El siguiente controlador HTTP.
   * @param err El error HTTP.
   * @returns Un Observable de HttpEvent.
   */
  private handleTokenError(request: HttpRequest<any>, next: HttpHandler, err: any): Observable<HttpEvent<any>> {
    if (request.url.includes('refreshtoken')) {
      this.authService.clearStorage();
      location.reload();
    }
  
    const errorData: any = {
      error: err.error,
      err: err
    };
  
    return throwError(() => errorData);
  }
  
  /**
   * Maneja el error de token expirado.
   * @param request La solicitud HTTP.
   * @param next El siguiente controlador HTTP.
   * @returns Un Observable de HttpEvent.
   */
  private handleExpiredToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null!);
  
      return this.authService.refreshToken().pipe(
        switchMap((user: IUserPayload) => {
          return next.handle(this.addTokenToRequest(request, user.token!));
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.waitForTokenRefresh(request, next);
    }
  }
  
  /**
   * Espera a que se actualice el token antes de continuar con la solicitud HTTP.
   * @param request La solicitud HTTP.
   * @param next El siguiente controlador HTTP.
   * @returns Un Observable de HttpEvent.
   */
  private waitForTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenSubject.pipe(
      filter((token) => token != null),
      take(1),
      switchMap((token: string) => {
        return next.handle(this.addTokenToRequest(request, token));
      })
    );
  }
}
