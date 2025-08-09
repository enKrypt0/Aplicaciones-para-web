import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../../interfaces/database';
import { CarritoService } from '../../services/carrito.service';
import type { Producto } from '../../interfaces/iproductos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private dbService = DatabaseService.getInstance();
  private carritoService = inject(CarritoService);

  productos: Producto[] = [];

  // Computed signals del carrito
  totalItems = this.carritoService.totalItems;
  total = this.carritoService.total;

  ngOnInit() {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.productos = this.dbService.getProductos();
  }

  agregarAlCarrito(producto: Producto, cantidad: number = 1) {
    this.carritoService.agregarProducto(producto, cantidad);
  }

  obtenerCantidadEnCarrito(productoId: number): number {
    return this.carritoService.obtenerCantidadProducto(productoId);
  }

  aumentarCantidad(producto: Producto) {
    const cantidadActual = this.obtenerCantidadEnCarrito(producto.id);
    this.carritoService.actualizarCantidad(producto.id, cantidadActual + 1);
  }

  disminuirCantidad(producto: Producto) {
    const cantidadActual = this.obtenerCantidadEnCarrito(producto.id);
    if (cantidadActual > 0) {
      this.carritoService.actualizarCantidad(producto.id, cantidadActual - 1);
    }
  }

  // Métodos de debug para demostrar la persistencia
  limpiarBaseDatos() {
    if (confirm('¿Estás seguro de que quieres limpiar toda la base de datos? Esto eliminará el carrito y todos los datos guardados.')) {
      this.dbService.clearLocalStorage();
      this.carritoService.vaciarCarrito();
      alert('Base de datos limpiada. La página se recargará.');
      window.location.reload();
    }
  }

  verBaseDatos() {
    const carrito = this.carritoService.carrito();
    const productos = this.productos;
    const totalItems = this.totalItems();
    
    console.log('Estado actual de la base de datos:');
    console.log('Productos:', productos);
    console.log('Carrito:', carrito);
    console.log('Total items en carrito:', totalItems);
    console.log('LocalStorage:', localStorage.getItem('ecommerce_db'));
    
    alert(`Estado de la BD mostrado en la consola del navegador.
    
Items en carrito: ${totalItems}
Total: $${this.total().toFixed(2)}

Abre las herramientas de desarrollador (F12) para ver más detalles.`);
  }
}
