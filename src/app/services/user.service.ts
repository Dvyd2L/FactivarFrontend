import { Injectable } from '@angular/core';
import { StorageHelper } from '@app/helpers/storage.helper';
import { StorageKeyEnum } from '@app/interfaces/enums/storage.enum';
import { IUserPayload } from '@app/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio para gestionar la información del usuario.
 * @template T - Tipo de objeto que representa al usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService<T extends { token: string }> {
  private currentUserSubject = new BehaviorSubject<T>(null!);
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
    return this.userValue && this.userValue.token
      ? this.userValue.token
      : StorageHelper.getItem<IUserPayload>(StorageKeyEnum.User)?.token ??
          StorageHelper.getItem(StorageKeyEnum.Token) ?? null;
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
}
