import type { ICarritoItem } from "./icarritoItem";

export type Carrito = {
  items: ICarritoItem[];
  total: number;
  cantidadTotal: number;
};