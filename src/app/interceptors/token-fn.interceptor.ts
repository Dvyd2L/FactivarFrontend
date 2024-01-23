import { UserService } from '@app/services/user.service';
import { IUserPayload } from '@app/interfaces/user';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { addTokenToRequest } from '@app/helpers/addTokenToRequest';

export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.url.includes(environment.urlAPI)) {
    const userService = inject(UserService<IUserPayload>);
    const token = userService.getToken();
    const authReq = addTokenToRequest(req, token);

    return next(authReq);
  }

  return next(req);
};
