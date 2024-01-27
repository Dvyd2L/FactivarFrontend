import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'FactivarApp', // Nombre de tu base de datos IndexedDB
  version: 1, // Versión de tu base de datos IndexedDB
  objectStoresMeta: [
    // Define los almacenes de objetos que quieres crear
    {
      store: 'people', // Nombre del almacén de objetos
    //   storeConfig: { keyPath: ['id', 'name', 'email'], autoIncrement: true }, // Configuración del almacén de objetos
      storeConfig: { keyPath: 'id', autoIncrement: true }, // Configuración del almacén de objetos
      storeSchema: [
        // Esquema del almacén de objetos
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } },
      ],
    },
  ],
};
