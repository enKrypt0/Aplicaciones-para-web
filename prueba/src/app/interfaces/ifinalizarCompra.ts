import type { ICarritoItem } from "./icarritoItem";
import type { ICliente } from "./icliente";
import type { IDireccion } from "./idireccion";
import type { IMetodoPago } from "./imetodoPago";

export interface FinalizarCompra {
  // Items del carrito
  items: ICarritoItem[];
  
  // Cálculos financieros
  subtotal: number;
  impuestos: number;
  envio: number;
  total: number;
  
  // Información del cliente
  cliente: ICliente;

  // Dirección de envío
  IDireccion: IDireccion;
  
  // Método de pago
  pago: IMetodoPago;
  
  // Estado y tracking de la compra
  estado: 'carrito' | 'procesando' | 'pagado' | 'enviado' | 'entregado';
  numeroPedido?: string;
  fecha?: Date;
}