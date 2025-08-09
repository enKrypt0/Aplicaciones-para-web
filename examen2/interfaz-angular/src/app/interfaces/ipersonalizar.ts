import type { Producto } from "./iproductos";

export interface PersonalizacionProducto {
  // Información del producto
  productoId: Producto['id'];
  cantidad: number;
  
  // Personalización de color
  color: {
    nombre: string;
    codigo: string;
    precioAdicional: number;
  };
  
  // Personalización de texto
  texto: {
    contenido: string;
    posicion: 'frontal' | 'trasera' | 'lateral';
    fuente: string;
    tamaño: number;
    color: string;
    precio: number;
  };
  
  // Personalización de imagen
  imagen?: {
    archivo: File | string;
    url?: string;
    posicion: 'frontal' | 'trasera' | 'lateral';
    dimensiones: {
      ancho: number;
      alto: number;
      x: number;
      y: number;
    };
    precio: number;
  };
  
  // Cálculos de precio
  precios: {
    base: number;
    personalizacion: number;
    total: number;
  };
  
  // Estado
  estado: 'editando' | 'guardado' | 'finalizado';
  fechaModificacion: Date;
}