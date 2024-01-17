import { Injectable } from '@angular/core';
import { StorageHelper } from '@app/helpers/storage';
import { IUserPayload } from '@app/interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService<T extends {token:string}> {
  private currentUserSubject: BehaviorSubject<T>;
  private user: Observable<T>;

  public get userValue(): T {
    return this.currentUserSubject.value;
  }

  public get storageUser() {
    return environment.storage.user;
  }

  public constructor() {
    const storedUser = StorageHelper.getItem<T>(this.storageUser, true);

    this.currentUserSubject = new BehaviorSubject<T>(storedUser!);
    this.user = this.currentUserSubject.asObservable();
  }

  public getUser(): Observable<T> {
    return this.user;
  }

  public getToken(): string | null {
    return this.userValue && this.userValue.token ? this.userValue.token : null;
  }

  // creo k es inutil
  public getAvatar(): any {
    const token = this.getToken() ?? '';
    const helper = new JwtHelperService();
    const tokenDecoded = helper.decodeToken(token);

    return token === '' ? token : tokenDecoded['thumbprint']!;
  }

  public updateUser(user: T) {
    StorageHelper.setItem(this.storageUser, user, true);
    this.currentUserSubject.next(user);
  }

  public clearUser() {
    StorageHelper.removeItem(this.storageUser, true);
    this.currentUserSubject.next(null!);
  }
}
