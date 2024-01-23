import { Injectable } from '@angular/core';
import { StorageHelper } from '@app/helpers/storage';
import { StorageKeyEnum } from '@app/interfaces/enums/storage.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService<T extends {token:string}> {
  private currentUserSubject= new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();

  public get userValue(): T {
    return this.currentUserSubject.value;
  }

  public getUser(): Observable<T> {
    return this.user$;
  }

  public getToken(): string | null {
    return this.userValue && this.userValue.token ? this.userValue.token : null;
  }
  
  public updateUser(user: T) {
    StorageHelper.setItem(StorageKeyEnum.User, user);
    this.currentUserSubject.next(user);
  }

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
