import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IFacturaResponse } from '@app/interfaces/factura.interface';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-invoice-template',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, CurrencyPipe],
  templateUrl: './invoice-template.component.html',
  styleUrl: './invoice-template.component.css'
})
export class InvoiceTemplateComponent {
  invoice$ = getDataByPk<IFacturaResponse>('facturas')

  jsonParser = (data:string) => JSON.parse(data);
}
