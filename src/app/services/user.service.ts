import { Injectable } from '@angular/core';
import { StorageHelper } from '@app/helpers/storage';
import { StorageKeyEnum } from '@app/interfaces/enums/storage.enum';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio para gestionar la información del usuario.
 * @template T - Tipo de objeto que representa al usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService<T extends {token:string}> {
  private currentUserSubject= new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();

  /**
   * Obtiene el valor actual del usuario.
   */
  public get userValue(): T {
    return this.currentUserSubject.value;
  }

  /**
   * Obtiene un observable que emite el usuario actual.
   * @returns Observable que emite el usuario actual.
   */
  public getUser(): Observable<T> {
    return this.user$;
  }

  /**
   * Obtiene el token del usuario actual.
   * @returns Token del usuario actual o null si no hay usuario.
   */
  public getToken(): string | null {
    return this.userValue && this.userValue.token ? this.userValue.token : null;
  }
  
  /**
   * Actualiza la información del usuario.
   * @param user - Nuevo objeto de usuario.
   */
  public updateUser(user: T) {
    StorageHelper.setItem(StorageKeyEnum.User, user);
    this.currentUserSubject.next(user);
  }

  /**
   * Elimina la información del usuario.
   */
  public clearUser() {
    StorageHelper.removeItem(StorageKeyEnum.User);
    this.currentUserSubject.next(null!);
  }

  // public constructor() {
  //   const storedUser = StorageHelper.getItem<T>(StorageKeyEnum.User, true);

  //   this.currentUserSubject = new BehaviorSubject<T>(storedUser!);
  //   this.user$ = this.currentUserSubject.asObservable();
  // }

  // creo k es inutil
  // public getAvatar(): any {
  //   const token = this.getToken() ?? '';
  //   const helper = new JwtHelperService();
  //   const tokenDecoded = helper.decodeToken(token);

  //   return token === '' ? token : tokenDecoded['thumbprint']!;
  // }

}
