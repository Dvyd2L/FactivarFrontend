import { Component, inject } from '@angular/core';
import { IndexedDBService } from '@app/db/indexed-db.service';

@Component({
  standalone: true,
  selector: 'app-prueba',
  template: ` <button
      class="btn btn-danger"
      type="button"
      (click)="crearDatos()"
    >
      Crear Datos
    </button>
    <br />
    <button class="btn btn-success" type="button" (click)="leerDatos()">
      Leer Datos
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

  // Añadir un nuevo registro al almacén de objetos
  crearDatos() {
    this.idxDb.create(this.data).subscribe({
      next: (data) => console.log({ msg: 'Registro añadido con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al añadir el registro', error }),
      complete: () => {},
    });
  }

  // Añadir un nuevo registro al almacén de objetos
  leerDatos() {
    this.idxDb.read(this.data.id).subscribe({
      next: (data) => console.log({ msg: 'Registro obtenido con éxito', data }),
      error: (error) =>
        console.error({ msg: 'Error al leer el registro', error }),
      complete: () => {},
    });
  }
}
