import { Observable } from 'rxjs';
import { DbNameEnum, DbStoreNameEnum } from '../enums';

export interface ICrudPromise<T> {
  create(data: T): Promise<void>;
  read(): Promise<T>;
  update(data: T): Promise<void>;
  delete(): Promise<void>;
}

export interface ICrudObservable {
  create<T>(storeName: DbStoreNameEnum, data: IidxDBentry<T>): Observable<void>;
  read<T>(storeName: DbStoreNameEnum): Observable<T>;
  update<T>(
    storeName: DbStoreNameEnum,
    key: IDBValidKey,
    data: T
  ): Observable<void>;
  delete(storeName: DbStoreNameEnum, key: IDBValidKey): Observable<void>;
}
export interface IidxDBentry<T> {
  key: IDBValidKey;
  data: T;
}
export interface IIndexedDb {
  name: DbNameEnum;
  version?: number;
  store: IIndexedDbStore;
}

export interface IIndexedDbStore {
  name: DbStoreNameEnum;
  version?: number;
  options?: IDBObjectStoreParameters;
}
