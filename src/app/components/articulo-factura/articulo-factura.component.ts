import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Componente para mostrar un artículo de una factura.
 */
@Component({
  selector: 'app-articulo-factura',
  standalone: true,
  imports: [],
  templateUrl: './articulo-factura.component.html',
  styleUrl: './articulo-factura.component.css',
})
export class ArticuloFacturaComponent {
  /**
   * Evento que se emite cuando se desea eliminar el artículo.
   */
  @Output() pacos = new EventEmitter<void>();

  constructor() {}

  /**
   * Método para eliminar el artículo.
   */
  removeArticle() {
    this.pacos.emit();
  }
}
