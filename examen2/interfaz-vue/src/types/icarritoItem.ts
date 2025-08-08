import type { Producto } from "./iproductos";

export type ICarritoItem = {
  producto: Producto;
  cantidadSeleccionada: number;
  subtotal: number;
};