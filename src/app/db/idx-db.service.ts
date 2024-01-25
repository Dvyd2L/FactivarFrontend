import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbNameEnum, DbStoreNameEnum } from './types/enums';
import { IIndexedDbStore } from './types/interfaces';
/**
 * @class IndexedDbService
 * @description Servicio para interactuar con IndexedDB.
 */
@Injectable({
  providedIn: 'root',
})
export class IdxDbService {
  /**
   * @private
   * @type {IDBDatabase}
   * @description La base de datos IndexedDB.
   */
  private db!: IDBDatabase;
  /**
   * @public
   * @async
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
   * @async
   * @method createStore
   * @description Crea el almacén de objetos.
   * @param {IIndexedDbStore<T>} store - La configuración del almacén de objetos.
   * @returns {Observable<void>}
   */
  public createStore<T>(store: IIndexedDbStore<T>): Observable<void> {
    const request = indexedDB.open(store.name, store.version);

    return new Observable<void>((observer) => {
      request.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
        const db = (ev.target as IDBOpenDBRequest).result;
        db.createObjectStore(store.name, store.options);

        observer.next();
        observer.complete();
      };
      request.onerror = (ev: Event) =>
        observer.error({ msg: 'Error opening indexedDB store', ev });
    });
  }
  /**
   * @public
   * @async
   * @method create
   * @template T - Tipo de los datos de los elementos almacenados
   * @description Agrega datos al almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {T} data - Los datos para agregar.
   * @returns {Observable<void>}
   */
  public create<T>(storeName: DbStoreNameEnum, data: T): Observable<void> {
    return new Observable<void>((observer) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);

      tx.oncomplete = () => {
        observer.next();
        observer.complete();
      };
      tx.onerror = (ev: Event) => observer.error((ev.target as IDBRequest).error);
    });
  }
  /**
   * Método para obtener todos los datos de un almacén de objetos.
   * @public
   * @async
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
   * @async
   * @method update
   * @template T - Tipo de los datos de los elementos almacenados
   * @description Actualiza un registro en el almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {IDBValidKey} key - La clave del registro a actualizar.
   * @param {T} data - Los nuevos datos para el registro.
   * @returns {Observable<void>}
   */
  public update<T>(
    storeName: DbStoreNameEnum,
    key: IDBValidKey,
    data: T
  ): Observable<void> {
    return new Observable<void>((observer) => {
      const tx = this.db?.transaction(storeName, 'readwrite');
      const store = tx?.objectStore(storeName);
      store?.put(data, key);

      tx.oncomplete = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };
      tx.onerror = (ev: Event) => observer.error((ev.target as IDBRequest).error);
    });
  }
  /**
   * @public
   * @async
   * @method delete
   * @description Elimina un registro del almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {IDBValidKey} key - La clave del registro a eliminar.
   * @returns {Observable<void>}
   */
  public delete(
    storeName: DbStoreNameEnum,
    key: IDBValidKey
  ): Observable<void> {
    return new Observable<void>((observer) => {
      const tx = this.db?.transaction(storeName, 'readwrite');
      const store = tx?.objectStore(storeName);
      store?.delete(key);

      tx.oncomplete = (ev: Event) => {
        observer.next((ev.target as IDBRequest).result);
        observer.complete();
      };
      tx.onerror = (ev: Event) => observer.error((ev.target as IDBRequest).error);
    });
  }
}
