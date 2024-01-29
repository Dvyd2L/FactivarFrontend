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
    "Sid": "6f2269cb-9bb6-4815-b543-cbb06e4c5e60",
    "Email": "david.llopislaguna@gmail.com",
    "Name": "David",
    "Surname": "Llopis Laguna",
    "Role": "User",
    "Thumbprint": "C:/Dev/.NET/FactivarProject/AuthMS/wwwroot/Images/e424c813-9af2-4eb4-844b-f946fd2beaab_image_png.png",
    "MobilePhone": "685107027      ",
    "exp": 1709145475,
    "iss": "Factivar",
    "aud": "Factivar",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTaWQiOiI2ZjIyNjljYi05YmI2LTQ4MTUtYjU0My1jYmIwNmU0YzVlNjAiLCJFbWFpbCI6ImRhdmlkLmxsb3Bpc2xhZ3VuYUBnbWFpbC5jb20iLCJOYW1lIjoiRGF2aWQiLCJTdXJuYW1lIjoiTGxvcGlzIExhZ3VuYSIsIlJvbGUiOiJVc2VyIiwiVGh1bWJwcmludCI6IkM6L0Rldi8uTkVUL0ZhY3RpdmFyUHJvamVjdC9BdXRoTVMvd3d3cm9vdC9JbWFnZXMvZTQyNGM4MTMtOWFmMi00ZWI0LTg0NGItZjk0NmZkMmJlYWFiX2ltYWdlX3BuZy5wbmciLCJNb2JpbGVQaG9uZSI6IjY4NTEwNzAyNyAgICAgICIsImV4cCI6MTcwOTE0NTQ3NSwiaXNzIjoiRmFjdGl2YXIiLCJhdWQiOiJGYWN0aXZhciJ9.CiZT59wapJ-iFngEDVwJbkyUeNNcO1d26q0X-mkEDfk"
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
    this.idxDb.update(this.data, StoreEnum.USER).subscribe({
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
