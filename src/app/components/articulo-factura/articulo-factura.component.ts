import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { calculateImporteIva } from '@app/helpers/facturas.helper';
import { IProduct } from '@app/interfaces/factivar';

/**
 * Componente para mostrar un artículo de una factura.
 */
@Component({
  selector: 'app-articulo-factura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './articulo-factura.component.html',
  styleUrl: './articulo-factura.component.css',
})
export class ArticuloFacturaComponent {

  article : IProduct = {
    pUnitario : 0,
    unidades : 0,
    bImponible : 0,
    cuotaIva : 0,
    descripcion : "",
    importe : 0,
    iva : 0
  };



  calculaImporte(){
    this.article.importe = this.article.unidades * this.article.pUnitario;
  }
  /**
   * Evento que se emite cuando se desea eliminar el artículo.
   */
  @Output() pacos = new EventEmitter<void>();
  @Output() articulos = new EventEmitter<IProduct>();

  emiteArticle(){
    this.articulos.emit(this.article);
  }
  /**
   * Método para eliminar el artículo.
   */
  removeArticle() {
    this.pacos.emit();
  }
}
