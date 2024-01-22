import { CuotasIvaEnum } from "./enums/cuotas-iva.enum";

export interface IInvoice {
  numeroFactura: number;
  importe: number;
  iva: number;
  total: number;
  pendientePago: boolean;
  descripcionOperacion: string;
  fechaExpedicion: string;
  fechaCobro: string;
  cliente: ICustomer;
  articulos: IProduct[];
}

export interface ICustomer {
  cif: string;
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  fechaAlta: string;
}

export interface IProduct {
  descripcion: string;
  unidades: number;
  pUnitario: number;
  bImponible: number;
  iva: CuotasIvaEnum;
  cuotaIva: number;
  importe: number; // revisar
}
