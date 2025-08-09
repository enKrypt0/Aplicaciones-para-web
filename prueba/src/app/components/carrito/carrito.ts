import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import type { ICarritoItem } from '../../interfaces/icarritoItem';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent {
  private carritoService = inject(CarritoService);

  // Signals del carrito
  carrito = this.carritoService.carrito;
  subtotal = this.carritoService.subtotal;
  impuestos = this.carritoService.impuestos;
  costoEnvio = this.carritoService.costoEnvio;
  total = this.carritoService.total;
  totalItems = this.carritoService.totalItems;

  actualizarCantidad(productoId: number, cantidad: number) {
    this.carritoService.actualizarCantidad(productoId, cantidad);
  }

  actualizarCantidadItem(item: ICarritoItem, cantidad: number) {
    if (item.id) {
      this.carritoService.actualizarCantidadPorId(item.id, cantidad);
    } else {
      // Fallback para items sin ID (productos normales)
      this.carritoService.actualizarCantidad(item.producto.id, cantidad);
    }
  }

  eliminarProducto(productoId: number) {
    this.carritoService.eliminarProducto(productoId);
  }

  eliminarItem(item: ICarritoItem) {
    if (item.id) {
      this.carritoService.eliminarPorId(item.id);
    } else {
      // Fallback para items sin ID (productos normales)
      this.carritoService.eliminarProducto(item.producto.id);
    }
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }

  procederAlPago() {
    alert('Pago exitoso. Gracias por tu compra!');
  }
}
