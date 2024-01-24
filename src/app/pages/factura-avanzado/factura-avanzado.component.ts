import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ArticuloFacturaComponent } from '../../components/articulo-factura/articulo-factura.component';

/**
 * Componente para la página de factura avanzada.
 */
@Component({
  selector: 'app-factura-avanzado',
  standalone: true,
  imports: [ArticuloFacturaComponent],
  templateUrl: './factura-avanzado.component.html',
  styleUrl: './factura-avanzado.component.css',
})
export class FacturaAvanzadoComponent {
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  articuloFactura!: ViewContainerRef;

  /**
   * Agrega un artículo al componente ArticuloFactura.
   */
  addArticle() {
    this.articuloFactura.createComponent(ArticuloFacturaComponent);
  }

  /**
   * Elimina el artículo del componente ArticuloFactura.
   */
  removeArticle() {
    this.articuloFactura.remove();
  }
}
