/**
 * Componente para mostrar los detalles de un cliente.
 */
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from '@app/components/loader/loader.component';
import { ICliente } from '@app/interfaces/cliente.interface';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe, LoaderComponent],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css',
})
export class DetailCustomerComponent {
  /**
   * Observable que contiene los datos del cliente.
   */
  customer$ = getDataByPk<ICliente>('clientes');
}
