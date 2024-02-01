/**
 * Componente para mostrar los detalles de un cliente.
 */
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from '@app/components/loader/loader.component';
import { ICustomer } from '@app/interfaces/factivar';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, DatePipe, LoaderComponent],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css',
})
export class DetailCustomerComponent {
  /**
   * Observable que contiene los datos del cliente.
   */
  customer$ = getDataByPk<ICustomer>('clientes');
}
