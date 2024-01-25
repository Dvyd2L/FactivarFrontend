import { DbNameEnum, DbStoreNameEnum } from "@app/db/indexed-db.service";
import { Observable } from "rxjs";

export interface IIndexedDbData<T> {
}

export interface IIndexedDbDataItem<T> {}

export interface ICrudPromise<T> {
  create(data: T): Promise<void>;
  read(): Promise<T>;
  update(data: T): Promise<void>;
  delete(): Promise<void>;
}

export interface ICrudObservable<T> {
  create(data: T): Observable<void>;
  read(): Observable<T>;
  update(data: T): Observable<void>;
  delete(): Observable<void>;
}

export interface IIndexedDb<T> {
  name: DbNameEnum;
  version?: number;
  store: IIndexedDbStore<T>;
}

export interface IIndexedDbStore<T> {
  name: DbStoreNameEnum;
  version?: number;
  options?: IDBObjectStoreParameters;
  data: T;
}