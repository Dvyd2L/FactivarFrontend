import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ArticuloFacturaComponent } from '../articulo-factura/articulo-factura.component';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addArticle() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ArticuloFacturaComponent
    );
    this.articuloFactura.createComponent(factory);
  }

  removeArticle() {
    this.articuloFactura.remove();
  }
}
