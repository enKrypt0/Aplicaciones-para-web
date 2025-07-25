import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BebidaService } from '../services/bebida.service';
import { Bebida } from '../models/bebidas';

/**
 * Componente principal que maneja el CRUD de bebidas
 * Incluye funcionalidades para crear, leer, actualizar y eliminar bebidas
 * También gestiona el control de stock e inventario
 */
@Component({
  selector: 'app-add-bebida-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './AddBebidaForm.component.html',
  styleUrls: ['./AddBebidaForm.component.css']
})
export class AddBebidaFormComponent implements OnInit, OnDestroy {
  
  // Arreglo de bebidas
  bebidas: Bebida[] = [];
  
  // Bebida seleccionada para editar
  bebidaSeleccionada: Bebida | null = null;
  
  // Variables para el formulario
  nuevaBebida: Omit<Bebida, 'id'> = {
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    precio: 0,
    stock: 0
  };
  
  // Variables de control
  modoEdicion = false;
  cargando = false;
  
  // Suscripción para manejar los cambios en el arreglo de bebidas
  private subscription: Subscription = new Subscription();

  constructor(private bebidaService: BebidaService) { }

  /**
   * Se ejecuta cuando el componente se inicializa
   * Carga las bebidas iniciales
   */
  ngOnInit(): void {
    this.cargarBebidas();
  }

  /**
   * Se ejecuta cuando el componente se destruye
   * Limpia las suscripciones para evitar memory leaks
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Carga todas las bebidas desde el servicio
   */
  cargarBebidas(): void {
    this.cargando = true;
    
    this.subscription.add(
      this.bebidaService.obtenerBebidas().subscribe({
        next: (bebidas: Bebida[]) => {
          this.bebidas = bebidas;
          this.cargando = false;
        },
        error: (error: any) => {
          console.error('Error al cargar bebidas:', error);
          this.cargando = false;
        }
      })
    );
  }

  /**
   * Agrega una nueva bebida
   */
  agregarBebida(): void {
    // Validar que todos los campos estén completos
    if (!this.validarFormulario()) {
      alert('Por favor, complete todos los campos correctamente');
      return;
    }

    try {
      const bebidaCreada = this.bebidaService.agregarBebida(this.nuevaBebida);
      console.log('Bebida agregada:', bebidaCreada);
      
      // Limpiar el formulario
      this.limpiarFormulario();
      
      alert('Bebida agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar bebida:', error);
      alert('Error al agregar la bebida');
    }
  }

  /**
   * Prepara el formulario para editar una bebida
   * @param bebida Bebida a editar
   */
  editarBebida(bebida: Bebida): void {
    this.bebidaSeleccionada = { ...bebida };
    this.nuevaBebida = {
      nombre: bebida.nombre,
      descripcion: bebida.descripcion,
      imagenUrl: bebida.imagenUrl,
      precio: bebida.precio,
      stock: bebida.stock
    };
    this.modoEdicion = true;
    
    // Scroll hacia el formulario
    document.querySelector('.form-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  /**
   * Actualiza una bebida existente
   */
  actualizarBebida(): void {
    if (!this.bebidaSeleccionada) {
      alert('No hay bebida seleccionada para editar');
      return;
    }

    // Validar que todos los campos estén completos
    if (!this.validarFormulario()) {
      alert('Por favor, complete todos los campos correctamente');
      return;
    }

    try {
      const actualizada = this.bebidaService.actualizarBebida(
        this.bebidaSeleccionada.id,
        this.nuevaBebida
      );
      
      if (actualizada) {
        console.log('Bebida actualizada exitosamente');
        this.limpiarFormulario();
        alert('Bebida actualizada exitosamente');
      } else {
        alert('No se pudo actualizar la bebida');
      }
    } catch (error) {
      console.error('Error al actualizar bebida:', error);
      alert('Error al actualizar la bebida');
    }
  }

  /**
   * Elimina una bebida
   * @param id ID de la bebida a eliminar
   */
  eliminarBebida(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta bebida?')) {
      try {
        const eliminada = this.bebidaService.eliminarBebida(id);
        
        if (eliminada) {
          console.log('Bebida eliminada exitosamente');
          alert('Bebida eliminada exitosamente');
          
          // Si estaba editando la bebida eliminada, limpiar formulario
          if (this.bebidaSeleccionada?.id === id) {
            this.limpiarFormulario();
          }
        } else {
          alert('No se pudo eliminar la bebida');
        }
      } catch (error) {
        console.error('Error al eliminar bebida:', error);
        alert('Error al eliminar la bebida');
      }
    }
  }

  /**
   * Gestiona el stock de una bebida (reabastecer o ajustar)
   * @param bebida Bebida a gestionar
   */
  gestionarStock(bebida: Bebida): void {
    const nuevoStock = prompt(
      `Stock actual de "${bebida.nombre}": ${bebida.stock} unidades\n\nIngrese el nuevo stock:`,
      bebida.stock.toString()
    );

    if (nuevoStock !== null) {
      const stock = parseInt(nuevoStock);
      
      if (isNaN(stock) || stock < 0) {
        alert('Por favor ingrese un número válido mayor o igual a 0');
        return;
      }

      try {
        const actualizada = this.bebidaService.actualizarBebida(bebida.id, {
          ...bebida,
          stock: stock
        });

        if (actualizada) {
          const accion = stock > bebida.stock ? 'incrementado' : 'decrementado';
          alert(`Stock ${accion} exitosamente. Nuevo stock: ${stock} unidades`);
        }
      } catch (error) {
        console.error('Error al actualizar stock:', error);
        alert('Error al actualizar el stock');
      }
    }
  }

  /**
   * Cancela la edición y limpia el formulario
   */
  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  /**
   * Maneja el error de carga de imagen
   * @param event Evento de error de la imagen
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/300x200/e9ecef/6c757d?text=Sin+Imagen';
    }
  }

  /**
   * Valida que el formulario tenga datos correctos
   * @returns true si el formulario es válido
   */
  private validarFormulario(): boolean {
    const { nombre, descripcion, imagenUrl, precio, stock } = this.nuevaBebida;
    
    if (!nombre.trim() || !descripcion.trim() || !imagenUrl.trim()) {
      return false;
    }
    
    if (precio <= 0 || stock < 0) {
      return false;
    }
    
    // Validar URL básica
    try {
      new URL(imagenUrl);
    } catch {
      return false;
    }
    
    return true;
  }

  /**
   * Limpia el formulario y resetea las variables de control
   */
  private limpiarFormulario(): void {
    this.nuevaBebida = {
      nombre: '',
      descripcion: '',
      imagenUrl: '',
      precio: 0,
      stock: 0
    };
    this.bebidaSeleccionada = null;
    this.modoEdicion = false;
  }

  /**
   * Obtiene el número de bebidas con stock disponible
   */
  get bebidasConStock(): number {
    return this.bebidas.filter(bebida => bebida.stock > 0).length;
  }

  /**
   * Obtiene el número de bebidas agotadas
   */
  get bebidasAgotadas(): number {
    return this.bebidas.filter(bebida => bebida.stock === 0).length;
  }

  /**
   * Obtiene el valor total del inventario
   */
  get valorTotalInventario(): number {
    return this.bebidas.reduce((total, bebida) => {
      return total + (bebida.precio * bebida.stock);
    }, 0);
  }
}