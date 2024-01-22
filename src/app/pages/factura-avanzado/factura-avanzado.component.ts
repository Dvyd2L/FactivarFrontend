import {
  Component,
  ComponentFactoryResolver,
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

  // Codigo para hacer los pdf
  public downloadPDF(): void {
    // let DATA = this.content.nativeElement;

    // html2canvas(DATA)
    //   .then((canvas) => {
    //     let fileWidth = 208;
    //     let fileHeight = (canvas.height * fileWidth) / canvas.width;

    //     const FILEURI = canvas.toDataURL('image/png');
    //     let PDF = new jspdf('p', 'mm', 'a4');
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    //     PDF.save('angular-demo.pdf');
    //   })
    //   .catch((error) => {
    //     console.error('Hubo un error al generar el PDF:', error);
    //   });
  }
}
