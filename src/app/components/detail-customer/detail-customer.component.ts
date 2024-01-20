import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ICliente } from '@app/interfaces/cliente.interface';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css',
})
export class DetailCustomerComponent {
  customer$ = getDataByPk<ICliente>('clientes');
}
