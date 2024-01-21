import { ICliente } from "./cliente.interface";

export interface IFactura {
  numeroFactura: number;
  importe: number;
  cliente: string;
  fecha: Date;
}

// export interface IFacturaResponse {
//   numeroFactura?: number;
//   importe: number;
//   iva: number;
//   pendientePago: boolean;
//   descripcionOperacion: string;
//   fechaExpedicion: Date;
//   fechaCobro: Date;
//   clienteId: string;
//   articulos: IArticulo[];
// }
export interface IFacturaResponse {
  numeroFactura: number
  importe: number
  iva: number
  total: number
  pendientePago: boolean
  descripcionOperacion: string
  fechaExpedicion: string
  fechaCobro: string
  clienteId: string
  articulos: string
  cliente: ICliente
}

export interface IArticulo {
  descripcion: string;
  unidades: number;
  pUnitario: number;
  iva: number;
}
