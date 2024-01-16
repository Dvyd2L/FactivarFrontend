import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFacturaResponse, IFactura } from '@app/interfaces/factura.interface';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturasService {
  private urlAPI = environment.urlAPI+ 'api';

  public constructor(private http: HttpClient) {}

  public getFacturas(): Observable<IFacturaResponse[]> {
    return this.http.get<IFacturaResponse[]>(`${this.urlAPI}facturas`);
  }

  public addFactura(factura: IFactura): Observable<IFactura> {
    console.log(new Date(factura.fecha).toLocaleDateString());

    const datos = {
      importe: factura.importe,
      fecha:
        new Date(factura.fecha).getFullYear() +
        '-' +
        (new Date(factura.fecha).getMonth() + 1) +
        '-' +
        new Date(factura.fecha).getDate(),
      cliente: factura.cliente,
    };

    return this.http.post<IFactura>(`${this.urlAPI}facturas`, datos);
  }

  public updateFactura(factura: IFactura): Observable<IFactura> {
    return this.http.put<IFactura>(
      `${this.urlAPI}facturas/${factura.numeroFactura}`,
      factura
    );
  }

  public deleteFactura(numeroFactura: number): Observable<IFactura> {
    return this.http.delete<IFactura>(
      `${this.urlAPI}facturas/${numeroFactura}`
    );
  }
}
