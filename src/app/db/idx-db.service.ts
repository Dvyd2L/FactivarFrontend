import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbNameEnum, DbStoreNameEnum } from './types/enums';
import {
  ICrudObservable,
  IIndexedDbStore,
  IidxDBentry,
} from './types/interfaces';
/**
 * @class IndexedDbService
 * @description Servicio para interactuar con IndexedDB.
 */
@Injectable({
  providedIn: 'root',
})
export class IdxDbService implements ICrudObservable {
  /**
   * @private
   * @type {IDBDatabase}
   * @description La base de datos IndexedDB.
   */
  private db!: IDBDatabase;
  /**
   * @private
   * @type {Map<DbStoreNameEnum, IDBObjectStore>}
   * @description Los ObjectStore de datos de esta IndexedDB.
   */
  private dbOStoreMap: Map<DbStoreNameEnum, IDBObjectStore> = new Map<DbStoreNameEnum, IDBObjectStore>();
  /**
   * @public
   * @method createDb
   * @description Crea la base de datos.
   * @param {DbNameEnum} name - El nombre de la base de datos.
   * @param {number} version - La versión de la base de datos.
   * @returns {Observable<IDBDatabase>} La base de datos.
   */
  public createDb(
    name: DbNameEnum,
    version: number = 1
  ): Observable<IDBDatabase> {
    const request = indexedDB.open(name, version);

    return new Observable<IDBDatabase>((observer) => {
      request.onsuccess = (ev: Event) => {
        this.db = (ev.target as IDBOpenDBRequest).result;
        observer.next(this.db);
        observer.complete();
      };
      request.onerror = (ev: Event) =>
        observer.error({ msg: 'Error opening indexedDB', ev });
    });
  }
  /**
   * @public
   * @method createStore
   * @description Crea el almacén de objetos.
   * @param {IIndexedDbStore} store - La configuración del almacén de objetos.
   * @returns {Observable<IDBObjectStore>}
   */
  public createStore(
    store: IIndexedDbStore
  ): Observable<IDBObjectStore> {
    return new Observable<IDBObjectStore>((observer) => {
      const request = indexedDB.open(this.db.name);
      const { name, options = { keyPath: 'Sid', autoIncrement: true } } = store;
      
      request.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
        const store = this.db.createObjectStore(name, options);
        this.dbOStoreMap.set(name, store)

        observer.next(store);
        observer.complete();
      };

      request.onsuccess = (ev: Event) =>
        (this.db = (ev.target as IDBOpenDBRequest).result);

      request.onerror = (ev: Event) =>
        observer.error({ msg: 'Error opening indexedDB store', ev });
    });
  }
  /**
   * @public
   * @method create
   * @template T - Tipo de los datos de los elementos almacenados
   * @description Agrega datos al almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {T} data - Los datos para agregar.
   * @returns {Observable<any>}
   */
  public create<T>(
    storeName: DbStoreNameEnum,
    { key, data }: IidxDBentry<T>
  ): Observable<any> {
    return new Observable<any>((observer) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      // const store = tx.objectStore(storeName);
      // store.add(data, key);
      this.dbOStoreMap.get(storeName)?.add(data, key);
      
      tx.oncomplete = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };

      tx.onerror = (ev: Event) =>
        observer.error((ev.target as IDBRequest).error);
    });
  }
  /**
   * Método para obtener todos los datos de un almacén de objetos.
   * @public
   * @method read
   * @template T - Tipo de los datos de los elementos devueltos
   * @description Obtiene todos los datos del almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @returns {Observable<T>} Los datos del almacén de objetos.
   */
  public read<T>(storeName: DbStoreNameEnum): Observable<T> {
    return new Observable<T>((observer) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };

      request.onerror = (ev: Event) => {
        observer.error((ev.target as IDBRequest).error);
      };
    });
  }
  /**
   * @public
   * @method update
   * @template T - Tipo de los datos de los elementos almacenados
   * @description Actualiza un registro en el almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {IDBValidKey} key - La clave del registro a actualizar.
   * @param {T} data - Los nuevos datos para el registro.
   * @returns {Observable<any>}
   */
  public update<T>(
    storeName: DbStoreNameEnum,
    key: IDBValidKey,
    data: T
  ): Observable<any> {
    return new Observable<any>((observer) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(data, key);

      tx.oncomplete = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };

      tx.onerror = (ev: Event) =>
        observer.error((ev.target as IDBRequest).error);
    });
  }
  /**
   * @public
   * @method delete
   * @description Elimina un registro del almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {IDBValidKey} key - La clave del registro a eliminar.
   * @returns {Observable<any>}
   */
  public delete(storeName: DbStoreNameEnum, key: IDBValidKey): Observable<any> {
    return new Observable<any>((observer) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.delete(key);

      tx.oncomplete = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };

      tx.onerror = (ev: Event) =>
        observer.error((ev.target as IDBRequest).error);
    });
  }
}
