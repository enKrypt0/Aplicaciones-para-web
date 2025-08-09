import { Injectable, signal, computed } from '@angular/core';
import { DatabaseService } from '../interfaces/database';
import type { Carrito } from '../interfaces/icarrito';
import type { ICarritoItem } from '../interfaces/icarritoItem';
import type { Producto } from '../interfaces/iproductos';
import type { PersonalizacionProducto } from '../interfaces/ipersonalizar';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private dbService = DatabaseService.getInstance();
  private clienteId = 1; // Cliente por defecto para este ejemplo
  
  // Señales reactivas para el estado del carrito
  private carritoSignal = signal<Carrito>({
    items: [],
    total: 0,
    cantidadTotal: 0
  });

  // Computed signals para valores derivados
  public carrito = this.carritoSignal.asReadonly();
  
  public totalItems = computed(() => 
    this.carritoSignal().cantidadTotal
  );
  
  public subtotal = computed(() => 
    this.carritoSignal().items.reduce((total, item) => total + item.subtotal, 0)
  );
  
  public impuestos = computed(() => {
    const config = this.dbService.getConfiguracion();
    return this.subtotal() * config.impuestos;
  });
  
  public costoEnvio = computed(() => {
    const config = this.dbService.getConfiguracion();
    return this.subtotal() > 50 ? 0 : config.costoEnvio; // Envío gratis para compras > $50
  });
  
  public total = computed(() => 
    this.subtotal() + this.impuestos() + this.costoEnvio()
  );

  constructor() {
    this.cargarCarrito();
  }

  private cargarCarrito(): void {
    const carritoExistente = this.dbService.getCarrito(this.clienteId);
    if (carritoExistente) {
      this.carritoSignal.set(carritoExistente);
    }
  }

  private actualizarTotales(): void {
    const carritoActual = this.carritoSignal();
    const nuevoTotal = carritoActual.items.reduce((total, item) => total + item.subtotal, 0);
    const nuevaCantidadTotal = carritoActual.items.reduce((total, item) => total + item.cantidadSeleccionada, 0);
    
    this.carritoSignal.update(carrito => ({
      ...carrito,
      total: nuevoTotal,
      cantidadTotal: nuevaCantidadTotal
    }));
  }

  private guardarCarrito(): void {
    const carritoActual = this.carritoSignal();
    this.dbService.setCarrito(this.clienteId, carritoActual);
    this.dbService.saveToLocalStorage();
  }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const carritoActual = this.carritoSignal();
    const itemExistente = carritoActual.items.find(item => 
      item.producto.id === producto.id && !item.personalizacion
    );

    if (itemExistente) {
      // Si ya existe, actualizar cantidad
      const nuevosItems = carritoActual.items.map(item =>
        item.producto.id === producto.id && !item.personalizacion
          ? { 
              ...item, 
              cantidadSeleccionada: item.cantidadSeleccionada + cantidad,
              subtotal: (item.cantidadSeleccionada + cantidad) * item.producto.precio
            }
          : item
      );
      
      this.carritoSignal.update(carrito => ({
        ...carrito,
        items: nuevosItems
      }));
    } else {
      // Si no existe, agregar nuevo item
      const nuevoItem: ICarritoItem = {
        producto: producto,
        cantidadSeleccionada: cantidad,
        subtotal: cantidad * producto.precio,
        id: `producto-${producto.id}-${Date.now()}`
      };

      this.carritoSignal.update(carrito => ({
        ...carrito,
        items: [...carrito.items, nuevoItem]
      }));
    }

    this.actualizarTotales();
    this.guardarCarrito();
  }

  agregarProductoPersonalizado(personalizacion: PersonalizacionProducto): void {
    const producto = this.dbService.getProductoById(personalizacion.productoId);
    if (!producto) return;

    const nuevoItem: ICarritoItem = {
      producto: producto,
      cantidadSeleccionada: personalizacion.cantidad,
      subtotal: personalizacion.precios.total,
      personalizacion: personalizacion,
      id: `personalizado-${personalizacion.productoId}-${Date.now()}`
    };

    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: [...carrito.items, nuevoItem]
    }));

    this.actualizarTotales();
    this.guardarCarrito();
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      this.eliminarProducto(productoId);
      return;
    }

    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: carrito.items.map(item =>
        item.producto.id === productoId
          ? { 
              ...item, 
              cantidadSeleccionada: nuevaCantidad,
              subtotal: nuevaCantidad * item.producto.precio
            }
          : item
      )
    }));

    this.actualizarTotales();
    this.guardarCarrito();
  }

  eliminarProducto(productoId: number): void {
    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: carrito.items.filter(item => item.producto.id !== productoId)
    }));

    this.actualizarTotales();
    this.guardarCarrito();
  }

  vaciarCarrito(): void {
    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: [],
      total: 0,
      cantidadTotal: 0
    }));

    this.guardarCarrito();
  }

  obtenerCantidadProducto(productoId: number): number {
    const item = this.carritoSignal().items.find(item => 
      item.producto.id === productoId && !item.personalizacion
    );
    return item?.cantidadSeleccionada || 0;
  }

  actualizarCantidadPorId(itemId: string, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      this.eliminarPorId(itemId);
      return;
    }

    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: carrito.items.map(item =>
        item.id === itemId
          ? { 
              ...item, 
              cantidadSeleccionada: nuevaCantidad,
              subtotal: item.personalizacion 
                ? nuevaCantidad * item.personalizacion.precios.total / item.personalizacion.cantidad
                : nuevaCantidad * item.producto.precio
            }
          : item
      )
    }));

    this.actualizarTotales();
    this.guardarCarrito();
  }

  eliminarPorId(itemId: string): void {
    this.carritoSignal.update(carrito => ({
      ...carrito,
      items: carrito.items.filter(item => item.id !== itemId)
    }));

    this.actualizarTotales();
    this.guardarCarrito();
  }
}