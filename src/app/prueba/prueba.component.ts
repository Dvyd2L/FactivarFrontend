import { Component, inject } from '@angular/core';
import { IndexedDBService } from '@app/db/indexed-db.service';
import { StoreEnum } from '@app/interfaces/enums/store.enum';

@Component({
  standalone: true,
  selector: 'app-prueba',
  template: ` <button
      class="btn btn-primary"
      type="button"
      (click)="crearRegistro()"
    >
      Crear Datos
    </button>
    <br />
    <button class="btn btn-success" type="button" (click)="leerRegistro()">
      Leer Datos
    </button>,
    <br />
    <button class="btn btn-warning" type="button" (click)="modificarRegistro()">
      Modificar Datos
    </button>,
    <br />
    <button class="btn btn-danger" type="button" (click)="eliminarRegistro()">
      Eliminar Datos
    </button>`,
  providers: [IndexedDBService],
})
export class PruebaComponent {
  private idxDb = inject(IndexedDBService);
  public data = {
    id: crypto.randomUUID(),
    name: 'Paco',
    email: 'paco@example.com',
  };
  public data2 = {
    id: crypto.randomUUID(),
    name: 'Manue',
    email: 'pinturas@example.com',
  };

  // Añadir un nuevo registro al almacén de objetos
  crearRegistro() {
    this.idxDb.create(this.data, StoreEnum.USER).subscribe({
      next: (data) => console.log({ msg: 'Registro añadido con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al añadir el registro', error }),
      complete: () => {},
    });
  }

  // Añadir un nuevo registro al almacén de objetos
  leerRegistro() {
    this.idxDb.read(StoreEnum.USER).subscribe({
      next: (data) => console.log({ msg: 'Registro obtenido con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al leer el registro', error }),
      complete: () => {},
    });
  }

  // Añadir un nuevo registro al almacén de objetos
  modificarRegistro() {
    this.idxDb.update(this.data2, StoreEnum.USER).subscribe({
      next: (data) => console.log({ msg: 'Registro modificado con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al modificar el registro', error }),
      complete: () => {},
    });
  }
  // Añadir un nuevo registro al almacén de objetos
  eliminarRegistro() {
    this.idxDb.delete('96468b98-e6ab-4019-badb-e822d66df5ea', StoreEnum.USER).subscribe({
      next: (data) => console.log({ msg: 'Registro eliminado con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al eliminar el registro', error }),
      complete: () => {},
    });
  }
}
