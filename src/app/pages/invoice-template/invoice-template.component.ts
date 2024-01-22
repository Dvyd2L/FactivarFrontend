import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FactivarBrandComponent } from '@app/components/factivar-brand/factivar-brand.component';
import { pdfHelper } from '@app/helpers/pdfHelper';
import { IInvoice } from '@app/interfaces/factivar';
import { getDataByPk } from '@app/services/data.service';

@Component({
  selector: 'app-invoice-template',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, CurrencyPipe, FactivarBrandComponent],
  templateUrl: './invoice-template.component.html',
  styleUrl: './invoice-template.component.css',
})
export class InvoiceTemplateComponent implements OnInit {
  invoice$ = getDataByPk<IInvoice>('facturas');
  pdfConfig = {
    filename: '',
  };

  downloadPDF = pdfHelper;

  ngOnInit(): void {
    this.getPk();
  }

  getPk() {
    this.invoice$.subscribe({
      next: (data) =>
        (this.pdfConfig.filename = `factivar_${data.numeroFactura}_${data.fechaExpedicion}.pdf`),
      error: (err) => console.error(err),
    });
  }
}
