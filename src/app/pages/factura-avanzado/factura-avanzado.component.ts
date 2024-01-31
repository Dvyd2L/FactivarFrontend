/**
 * Componente para la página de factura avanzada.
 */
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ArticuloFacturaComponent } from '../../components/articulo-factura/articulo-factura.component';
import { calculateImportes } from '@app/helpers/facturas.helper';
import { FormsModule } from '@angular/forms';
import { IProduct } from '@app/interfaces/factivar';

@Component({
  selector: 'app-factura-avanzado',
  standalone: true,
  imports: [ArticuloFacturaComponent, FormsModule],
  templateUrl: './factura-avanzado.component.html',
  styleUrl: './factura-avanzado.component.css',
})
export class FacturaAvanzadoComponent {
  listaArticulos: IProduct[] = [];
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  articuloFactura!: ViewContainerRef;

  ricias = {
    subTotal: 0,
    importeTotal: 0,
  };
  /**
   * Agrega un artículo al componente ArticuloFactura.
   */
  // addArticle() {
  //   this.articuloFactura.createComponent(ArticuloFacturaComponent);
  // }

  addArticulo(item: IProduct){
    this.listaArticulos.push(item);
    this.ricias = calculateImportes(this.listaArticulos);
  }


  /**
   * Elimina el artículo del componente ArticuloFactura.
   */
  // removeArticle(item: IProduct) {
  //   console.log(this.listaArticulos);
  //   this.listaArticulos = this.listaArticulos.filter(p => {
  //     console.log(p.descripcion !== item.descripcion);
  //     return p.descripcion !== item.descripcion;
  //   });
  //   console.log(this.listaArticulos);
  //   this.ricias = calculateImportes(this.listaArticulos);
  // }

  removeArticle(item: number) {
    this.listaArticulos.splice(item,1);
    this.ricias = calculateImportes(this.listaArticulos);
  }
}
