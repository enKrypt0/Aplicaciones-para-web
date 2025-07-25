import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bebidas } from '../models/bebidas';

/**
 * Servicio para gestionar las operaciones CRUD de bebidas
 * Utiliza un BehaviorSubject para mantener el estado reactivo
 */
@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  
  // Array privado para almacenar las bebidas
  private bebidas: Bebidas[] = [
    {
      id: 1,
      nombre: 'Coca-Cola',
      descripcion: 'Bebida gaseosa refrescante con sabor original',
      imagenUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
      precio: 2.50,
      stock: 50
    },
    {
      id: 2,
      nombre: 'Agua Mineral',
      descripcion: 'Agua pura de manantial, perfecta para hidratarse',
      imagenUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
      precio: 1.25,
      stock: 100
    },
    {
      id: 3,
      nombre: 'Jugo de Naranja',
      descripcion: 'Jugo natural de naranja recién exprimido',
      imagenUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
      precio: 3.75,
      stock: 25
    },
    {
      id: 4,
      nombre: 'Café Americano',
      descripcion: 'Café negro preparado con granos premium',
      imagenUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      precio: 4.00,
      stock: 0
    },
    {
      id: 5,
      nombre: 'Smoothie de Frutas',
      descripcion: 'Batido natural con frutas frescas de temporada',
      imagenUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
      precio: 6.50,
      stock: 15
    }
  ];

  // Subject para emitir cambios en las bebidas
  private bebidasSubject = new BehaviorSubject<Bebidas[]>(this.bebidas);
  
  // Observable público para que los componentes se suscriban
  public bebidas$ = this.bebidasSubject.asObservable();

  // Contador para generar IDs únicos
  private siguienteId = 6;

  constructor() { }

  /**
   * Obtiene todas las bebidas como Observable
   * @returns Observable con el array de bebidas
   */
  obtenerBebidas(): Observable<Bebidas[]> {
    return this.bebidas$;
  }

  /**
   * Obtiene una bebida por su ID
   * @param id ID de la bebida
   * @returns La bebida encontrada o undefined
   */
  obtenerBebidaPorId(id: number): Bebidas | undefined {
    return this.bebidas.find(bebidas => bebidas.id === id);
  }

  /**
   * Agrega una nueva bebida
   * @param nuevaBebida Datos de la nueva bebida (sin ID)
   * @returns La bebida creada con su ID
   */
  agregarBebida(nuevaBebida: Omit<Bebidas, 'id'>): Bebidas {
    const bebida: Bebidas = {
      id: this.siguienteId++,
      ...nuevaBebida
    };

    this.bebidas.push(bebida);
    this.bebidasSubject.next([...this.bebidas]);
    
    return bebida;
  }

  /**
   * Actualiza una bebida existente
   * @param id ID de la bebida a actualizar
   * @param datosActualizados Nuevos datos de la bebida
   * @returns La bebida actualizada o null si no se encontró
   */
  actualizarBebida(id: number, datosActualizados: Partial<Bebidas>): Bebidas | null {
    const indice = this.bebidas.findIndex(bebida => bebida.id === id);
    
    if (indice === -1) {
      return null;
    }

    // Actualizar la bebida manteniendo el ID original
    this.bebidas[indice] = {
      ...this.bebidas[indice],
      ...datosActualizados,
      id: id // Asegurar que el ID no cambie
    };

    this.bebidasSubject.next([...this.bebidas]);
    
    return this.bebidas[indice];
  }

  /**
   * Elimina una bebida por su ID
   * @param id ID de la bebida a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  eliminarBebida(id: number): boolean {
    const indiceInicial = this.bebidas.length;
    this.bebidas = this.bebidas.filter(bebida => bebida.id !== id);
    
    if (this.bebidas.length < indiceInicial) {
      this.bebidasSubject.next([...this.bebidas]);
      return true;
    }
    
    return false;
  }

  /**
   * Actualiza solo el stock de una bebida
   * @param id ID de la bebida
   * @param nuevoStock Nuevo valor del stock
   * @returns La bebida actualizada o null si no se encontró
   */
  actualizarStock(id: number, nuevoStock: number): Bebidas | null {
    return this.actualizarBebida(id, { stock: nuevoStock });
  }

  /**
   * Obtiene bebidas con stock bajo (menos de 10 unidades)
   * @returns Array de bebidas con stock bajo
   */
  obtenerBebidasStockBajo(): Bebidas[] {
    return this.bebidas.filter(bebida => bebida.stock < 10 && bebida.stock > 0);
  }

  /**
   * Obtiene bebidas agotadas (stock = 0)
   * @returns Array de bebidas agotadas
   */
  obtenerBebidasAgotadas(): Bebidas[] {
    return this.bebidas.filter(bebida => bebida.stock === 0);
  }

  /**
   * Obtiene estadísticas del inventario
   * @returns Objeto con estadísticas del inventario
   */
  obtenerEstadisticas() {
    const total = this.bebidas.length;
    const disponibles = this.bebidas.filter(b => b.stock > 0).length;
    const agotadas = this.bebidas.filter(b => b.stock === 0).length;
    const stockBajo = this.obtenerBebidasStockBajo().length;
    const valorTotal = this.bebidas.reduce((sum, b) => sum + (b.precio * b.stock), 0);
    const stockTotal = this.bebidas.reduce((sum, b) => sum + b.stock, 0);

    return {
      totalBebidas: total,
      disponibles,
      agotadas,
      stockBajo,
      valorTotal,
      stockTotal,
      precioPromedio: total > 0 ? this.bebidas.reduce((sum, b) => sum + b.precio, 0) / total : 0
    };
  }

  /**
   * Busca bebidas por nombre (búsqueda parcial, case-insensitive)
   * @param termino Término de búsqueda
   * @returns Array de bebidas que coinciden con la búsqueda
   */
  buscarBebidas(termino: string): Bebidas[] {
    if (!termino.trim()) {
      return this.bebidas;
    }
    
    const terminoLower = termino.toLowerCase().trim();
    return this.bebidas.filter(bebida => 
      bebida.nombre.toLowerCase().includes(terminoLower) ||
      bebida.descripcion.toLowerCase().includes(terminoLower)
    );
  }

  /**
   * Filtra bebidas por rango de precios
   * @param precioMin Precio mínimo
   * @param precioMax Precio máximo
   * @returns Array de bebidas en el rango de precios
   */
  filtrarPorPrecio(precioMin: number, precioMax: number): Bebidas[] {
    return this.bebidas.filter(bebida => 
      bebida.precio >= precioMin && bebida.precio <= precioMax
    );
  }

  /**
   * Reinicia los datos a los valores por defecto
   */
  reiniciarDatos(): void {
    this.bebidas = [
      {
        id: 1,
        nombre: 'Coca-Cola',
        descripcion: 'Bebida gaseosa refrescante con sabor original',
        imagenUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        precio: 2.50,
        stock: 50
      },
      {
        id: 2,
        nombre: 'Agua Mineral',
        descripcion: 'Agua pura de manantial, perfecta para hidratarse',
        imagenUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
        precio: 1.25,
        stock: 100
      },
      {
        id: 3,
        nombre: 'Jugo de Naranja',
        descripcion: 'Jugo natural de naranja recién exprimido',
        imagenUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
        precio: 3.75,
        stock: 25
      },
      {
        id: 4,
        nombre: 'Café Americano',
        descripcion: 'Café negro preparado con granos premium',
        imagenUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
        precio: 4.00,
        stock: 0
      },
      {
        id: 5,
        nombre: 'Smoothie de Frutas',
        descripcion: 'Batido natural con frutas frescas de temporada',
        imagenUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
        precio: 6.50,
        stock: 15
      }
    ];
    
    this.siguienteId = 6;
    this.bebidasSubject.next([...this.bebidas]);
  }
}
