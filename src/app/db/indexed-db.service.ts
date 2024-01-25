import { Injectable } from '@angular/core';
import { DbNameEnum, DbStoreNameEnum } from './types/enums';
import { IIndexedDbStore } from './types/interfaces';
/**
 * @class IndexedDbService
 * @description Servicio para interactuar con IndexedDB.
 */
@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
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
   * @returns {Promise<IDBDatabase>} La base de datos.
   */
  public async createDb(
    name: DbNameEnum,
    version: number = 1
  ): Promise<IDBDatabase> {
    const request = indexedDB.open(name, version);

    return new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = (ev: Event) => {
        this.db = (ev.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (ev: Event) => {
        console.log({ msg: 'Error opening indexedDB', ev });
        reject(ev);
      };
    });
  }
  /**
   * @public
   * @async
   * @method createStore
   * @description Crea el almacén de objetos.
   * @param {IIndexedDbStore<T>} store - La configuración del almacén de objetos.
   * @returns {Promise<void>}
   */
  public async createStore<T>(store: IIndexedDbStore<T>): Promise<void> {
    const request = indexedDB.open(store.name, store.version);

    request.onupgradeneeded = (ev: IDBVersionChangeEvent) => {
      const db = (ev.target as IDBOpenDBRequest).result;
      db.createObjectStore(store.name, store.options);
    };
  }
  /**
   * @public
   * @async
   * @method create
   * @template T - Tipo de los datos de los elementos almacenados
   * @description Agrega datos al almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {T} data - Los datos para agregar.
   * @returns {Promise<void>}
   */
  public async create<T>(storeName: DbStoreNameEnum, data: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const tx = this.db?.transaction(storeName, 'readwrite');
      const store = tx?.objectStore(storeName);
      store?.add(data);

      tx?.addEventListener('complete', () => resolve());

      tx?.addEventListener('error', (ev: Event) =>
        reject((ev.target as IDBRequest).error)
      );
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
   * @returns {Promise<T>} Los datos del almacén de objetos.
   */
  public async read<T>(storeName: DbStoreNameEnum): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const tx = this.db?.transaction(storeName, 'readonly');
      const store = tx?.objectStore(storeName);
      const request = store?.getAll();

      request?.addEventListener('success', (ev: Event) => {
        resolve((ev.target as IDBRequest).result);
      });

      request?.addEventListener('error', (ev: Event) => {
        reject((ev.target as IDBRequest).error);
      });
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
   * @returns {Promise<void>}
   */
  public async update<T>(storeName: DbStoreNameEnum, key: IDBValidKey, data: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const tx = this.db?.transaction(storeName, 'readwrite');
      const store = tx?.objectStore(storeName);
      store?.put(data, key);

      tx?.addEventListener('complete', () => resolve());

      tx?.addEventListener('error', (ev: Event) => {
        reject((ev.target as IDBRequest).error);
      });
    });
  }
  /**
   * @public
   * @async
   * @method delete
   * @description Elimina un registro del almacén de objetos especificado.
   * @param {DbStoreNameEnum} storeName - El nombre del almacén de objetos.
   * @param {IDBValidKey} key - La clave del registro a eliminar.
   * @returns {Promise<void>}
   */
  public async delete(storeName: DbStoreNameEnum, key: IDBValidKey): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const tx = this.db?.transaction(storeName, 'readwrite');
      const store = tx?.objectStore(storeName);
      store?.delete(key);

      tx?.addEventListener('complete', () => resolve());

      tx?.addEventListener('error', (ev: Event) => {
        reject((ev.target as IDBRequest).error);
      });
    });
  }
}
