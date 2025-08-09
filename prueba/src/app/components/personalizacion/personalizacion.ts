import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../../interfaces/database';
import { CarritoService } from '../../services/carrito.service';
import type { Producto } from '../../interfaces/iproductos';
import type { PersonalizacionProducto } from '../../interfaces/ipersonalizar';

@Component({
  selector: 'app-personalizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './personalizacion.html',
  styleUrls: ['./personalizacion.css']
})
export class Personalizacion implements OnInit {
  private dbService = DatabaseService.getInstance();
  private carritoService = inject(CarritoService);

  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  // Computed signals del carrito
  totalItems = this.carritoService.totalItems;
  total = this.carritoService.total;
  
  personalizacion: PersonalizacionProducto = {
    productoId: 0,
    color: { nombre: '', codigo: '', precioAdicional: 0 },
    texto: { 
      contenido: '', 
      posicion: 'frontal', 
      fuente: 'Arial', 
      tamaño: 12, 
      color: '#000000', 
      precio: 0 
    },
    cantidad: 1,
    precios: {
      base: 0,
      personalizacion: 0,
      total: 0
    },
    estado: 'editando',
    fechaModificacion: new Date()
  };

  coloresDisponibles = [
    { nombre: 'Blanco', codigo: '#FFFFFF', precioAdicional: 0 },
    { nombre: 'Negro', codigo: '#000000', precioAdicional: 0 },
    { nombre: 'Rojo', codigo: '#FF0000', precioAdicional: 0 },
    { nombre: 'Azul', codigo: '#0000FF', precioAdicional: 0 },
    { nombre: 'Verde', codigo: '#008000', precioAdicional: 0 },
    { nombre: 'Rosa', codigo: '#FFC0CB', precioAdicional: 0 }
  ];

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productos = this.dbService.getProductos();
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
    this.personalizacion = {
      productoId: producto.id,
      color: { nombre: '', codigo: '', precioAdicional: 0 },
      texto: { 
        contenido: '', 
        posicion: 'frontal', 
        fuente: 'Arial', 
        tamaño: 12, 
        color: '#000000', 
        precio: 0 
      },
      cantidad: 1,
      precios: {
        base: producto.precio,
        personalizacion: 0,
        total: producto.precio
      },
      estado: 'editando',
      fechaModificacion: new Date()
    };
  }

  actualizarColor(color: { nombre: string; codigo: string; precioAdicional: number }) {
    this.personalizacion.color = color;
    this.calcularPrecios();
  }

  private calcularPrecios() {
    if (this.productoSeleccionado && this.personalizacion.color && this.personalizacion.texto) {
      const precioBase = this.productoSeleccionado.precio * this.personalizacion.cantidad;
      const precioPersonalizacion = this.personalizacion.color.precioAdicional + this.personalizacion.texto.precio;
      
      this.personalizacion.precios = {
        base: precioBase,
        personalizacion: precioPersonalizacion,
        total: precioBase + precioPersonalizacion
      };
    }
  }

  guardarPersonalizacion() {
    if (this.productoSeleccionado && this.personalizacion.cantidad > 0) {
      this.calcularPrecios();
      
      // Guardar personalización en la base de datos
      this.dbService.addPersonalizacion({...this.personalizacion});
      
      // Agregar al carrito
      this.carritoService.agregarProductoPersonalizado({...this.personalizacion});
      
      // Resetear formulario
      this.personalizacion = {
        productoId: 0,
        color: { nombre: '', codigo: '', precioAdicional: 0 },
        texto: { 
          contenido: '', 
          posicion: 'frontal', 
          fuente: 'Arial', 
          tamaño: 12, 
          color: '#000000', 
          precio: 0 
        },
        cantidad: 1,
        precios: {
          base: 0,
          personalizacion: 0,
          total: 0
        },
        estado: 'editando',
        fechaModificacion: new Date()
      };
      this.productoSeleccionado = null;
      
      alert('¡Producto personalizado agregado al carrito!');
    }
  }

  agregarAlCarritoDirecto() {
    if (this.productoSeleccionado && this.personalizacion.cantidad > 0) {
      this.calcularPrecios();
      this.carritoService.agregarProductoPersonalizado({...this.personalizacion});
      
      // No resetear formulario para permitir agregar más con la misma personalización
      alert('¡Producto personalizado agregado al carrito!');
    }
  }


  calcularPrecioTotal(): number {
    return this.personalizacion.precios.total;
  }

  onCantidadChange() {
    this.calcularPrecios();
  }

  onTextoChange() {
    this.calcularPrecios();
  }
}