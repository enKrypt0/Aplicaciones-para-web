import type { Producto } from "./iproductos";
import type { PersonalizacionProducto } from "./ipersonalizar";

export type ICarritoItem = {
  producto: Producto;
  cantidadSeleccionada: number;
  subtotal: number;
  personalizacion?: PersonalizacionProducto;
  id?: string; // ID único para distinguir productos iguales con diferentes personalizaciones
};