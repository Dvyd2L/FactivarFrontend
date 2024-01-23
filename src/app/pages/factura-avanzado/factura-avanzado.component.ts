import {
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ArticuloFacturaComponent } from '../../components/articulo-factura/articulo-factura.component';

@Component({
  selector: 'app-factura-avanzado',
  standalone: true,
  imports: [ArticuloFacturaComponent],
  templateUrl: './factura-avanzado.component.html',
  styleUrl: './factura-avanzado.component.css',
})
export class FacturaAvanzadoComponent {
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  articuloFactura!: ViewContainerRef;

  addArticle() {
    this.articuloFactura.createComponent(ArticuloFacturaComponent);
  }

  removeArticle() {
    this.articuloFactura.remove();
  }
}
