import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-articulo-factura',
  standalone: true,
  imports: [],
  templateUrl: './articulo-factura.component.html',
  styleUrl: './articulo-factura.component.css',
})
export class ArticuloFacturaComponent {
  @Output() pacos = new EventEmitter<void>();

  constructor() {}

  // addArticle() {
  //   this.event.emit(this.pacos);
  // }

  removeArticle() {
    this.pacos.emit();
  }
}
