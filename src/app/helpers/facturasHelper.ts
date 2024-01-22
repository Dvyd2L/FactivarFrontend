import { IProduct } from '@app/interfaces/factivar';

export const calculateImporteIva = (products: IProduct[]): IProduct[] =>
  products.map((x) => {
    return {
      ...x,
      bImponible: x.unidades * x.pUnitario,
      cuotaIva: (x.unidades * x.pUnitario * x.iva) / 100,
    };
  });

export const calculateImportes = (products: IProduct[]) => {
  const importes = {
    subTotal: 0,
    importeTotal: 0,
  };

  //   products.map((x) => {
  //     subTotal += x.bImponible;
  //   });
  calculateImporteIva(products).map((x) => {
    importes.subTotal += x.bImponible;
    importes.importeTotal += x.bImponible + x.cuotaIva;
  });

  return importes;
};
