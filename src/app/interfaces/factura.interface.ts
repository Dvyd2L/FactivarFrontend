export interface IFactura {
  numeroFactura: number;
  importe: number;
  cliente: string;
  fecha: Date;
}

export interface IFacturaResponse {
  numeroFactura?: number;
  importe: number;
  iva: number;
  pendientePago: boolean;
  descripcionOperacion: string;
  fechaExpedicion: Date;
  fechaCobro: Date;
  clienteId: string;
  articulos: IArticulo[];
}

export interface IArticulo {
  descripcion: string;
  unidades: number;
  pUnitario: number;
  iva: number;
}
