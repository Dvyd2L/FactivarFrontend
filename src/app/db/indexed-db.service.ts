import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private db = inject(NgxIndexedDBService);

  // Método para agregar un registro a la base de datos
  public create<T>(record: T): Observable<T> {
    return this.db.add('people', record);
  }

  // Método para obtener registros de la base de datos
  public read<T>(key?: `${string}-${string}-${string}-${string}-${string}`): Observable<T | T[]> {
    return key ? this.db.getByKey<T>('people', key) : this.db.getAll<T>('people');
  }

  // Método para actualizar un registro en la base de datos
  public update<T>(record: T): Observable<T> {
    return this.db.update('people', record);
  }

  // Método para eliminar un registro de la base de datos
  public delete<T>(key: number): Observable<T[]> {
    return this.db.delete('people', key);
  }
}
