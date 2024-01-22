import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IInvoice } from '@app/interfaces/factivar';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-invoice-template',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, CurrencyPipe],
  templateUrl: './invoice-template.component.html',
  styleUrl: './invoice-template.component.css'
})
export class InvoiceTemplateComponent {
  invoice$ = getDataByPk<IInvoice>('facturas');  
}
