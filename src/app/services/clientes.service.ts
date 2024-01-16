import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../interfaces/cliente.interface';
import { environment } from 'src/environments/environment';
import { IProveedor } from '../interfaces/proveedores.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private urlAPI = environment.urlAPI + 'api';

  public constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  public getClientes(): Observable<ICliente[]> {
    const headers = this.setHeaders().headers;

    return this.http.get<ICliente[]>(`${this.urlAPI}/clientes/all`, {
      headers,
    });
  }

  public addCliente(cliente: ICliente): Observable<ICliente> {
    const headers = this.setHeaders().headers;

    return this.http.post<ICliente>(`${this.urlAPI}/clientes`, cliente, {
      headers,
    });
  }

  public updateCliente(cliente: ICliente): Observable<ICliente> {
    const headers = this.setHeaders().headers;
    
    return this.http.put<ICliente>(
      `${this.urlAPI}/clientes/${cliente.cif}`,
      cliente,
      { headers }
      );
    }
    
    public deleteCliente(cif: string): Observable<ICliente> {
    const headers = this.setHeaders().headers;
    
    return this.http.delete<ICliente>(`${this.urlAPI}/clientes/${cif}`, { headers });
  }

  public getProveedor(): Observable<IProveedor[]> {
    return this.http.get<IProveedor[]>(`${this.urlAPI}/proveedor`);
  }

  public addProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.http.post<IProveedor>(`${this.urlAPI}/proveedor`, proveedor);
  }

  public updateProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.http.put<IProveedor>(
      `${this.urlAPI}clientes/${proveedor.cif}`,
      proveedor
    );
  }

  public deleteProveedor(cif: string): Observable<IProveedor> {
    return this.http.delete<IProveedor>(`${this.urlAPI}proveedor/${cif}`);
  }

  private setHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
  }
}
