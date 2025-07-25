import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bares } from '../models/bares';

/**
 * Servicio para gestionar las operaciones CRUD de bebidas
 * Utiliza un BehaviorSubject para mantener el estado reactivo
 */
@Injectable({
  providedIn: 'root'
})
export class BaresService {
  
  // Array privado para almacenar las bebidas
  private bares: Bares[] = [
    {
      id: 1,
      nombre: 'Latitud Cero',
      foto_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
      horario: '17:00 a 00:00',
      direccion: 'Avenida Universitaria',
      cerrado: false
      
    },
  ];

  // Subject para emitir cambios en las bebidas
  private baresSubject = new BehaviorSubject<Bares[]>(this.bares);
  
  // Observable público para que los componentes se suscriban
  public bares$ = this.baresSubject.asObservable();

  // Contador para generar IDs únicos
  private siguienteId = 6;

  constructor() { }

  /**
   * Obtiene todas los bares como Observable
   * @returns Observable con el array de bebidas
   */
  obtenerBares(): Observable<Bares[]> {
    return this.bares$;
  }

  /**
   * Obtiene una bebida por su ID
   * @param id ID de la bebida
   * @returns La bebida encontrada o undefined
   */
  obtenerBarPorId(id: number): Bares | undefined {
    return this.bares.find(bares => bares.id === id);
  }

  /**
   * Agrega una nueva bebida
   * @param nuevaBebida Datos de la nueva bebida (sin ID)
   * @returns La bebida creada con su ID
   */
  agregarBares(nuevoBar: Omit<Bares, 'id'>): Bares {
    const bar: Bares = {
      id: this.siguienteId++,
      ...nuevoBar
    };

    this.bares.push(bar);
    this.baresSubject.next([...this.bares]);
    
    return bar;
  }

  /**
   * Actualiza una bebida existente
   * @param id ID de la bebida a actualizar
   * @param datosActualizados Nuevos datos de la bebida
   * @returns La bebida actualizada o null si no se encontró
   */
  actualizarBares(id: number, datosActualizados: Partial<Bares>): Bares | null {
    const indice = this.bares.findIndex(bares => bares.id === id);
    
    if (indice === -1) {
      return null;
    }

    // Actualizar la bebida manteniendo el ID original
    this.bares[indice] = {
      ...this.bares[indice],
      ...datosActualizados,
      id: id // Asegurar que el ID no cambie
    };

    this.baresSubject.next([...this.bares]);
    
    return this.bares[indice];
  }

  /**
   * Elimina un bar por su ID
   * @param id ID de la bebida a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  eliminarBares(id: number): boolean {
    const indiceInicial = this.bares.length;
    this.bares = this.bares.filter(bares => bares.id !== id);
    
    if (this.bares.length < indiceInicial) {
      this.baresSubject.next([...this.bares]);
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
  actualizarHorario(id: number, nuevoHorario: string): Bares | null {
    return this.actualizarBares(id, { horario: nuevoHorario });
  }

  /**
   * Obtiene bebidas con stock bajo (menos de 10 unidades)
   * @returns Array de bebidas con stock bajo
   */
  obtenerBaresAbiertos(){
    return this.bares.filter(bares => bares.cerrado === false )
  }
  

  /**
   * Busca bebidas por nombre (búsqueda parcial, case-insensitive)
   * @param termino Término de búsqueda
   * @returns Array de bebidas que coinciden con la búsqueda
   */
  buscarBares(termino: string): Bares[] {
    if (!termino.trim()) {
      return this.bares;
    }
    
    const terminoLower = termino.toLowerCase().trim();
    return this.bares.filter(bares => 
      bares.nombre.toLowerCase().includes(terminoLower)
    );
  }

  /**
   * Filtra bebidas por rango de precios
   * @param precioMin Precio mínimo
   * @param precioMax Precio máximo
   * @returns Array de bebidas en el rango de precios
   */

  /**
   * Reinicia los datos a los valores por defecto
   */
  reiniciarDatos(): void {
    this.bares = [
      {
        id: 1,
        nombre: 'Latitud Cero',
        direccion: 'Avenida Universitaria',
        foto_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        horario: '17:00 a 00:00',
        cerrado: false
      },
      {
        id: 2,
        nombre: 'Lupulo',
        direccion: 'Avenida Universitaria',
        foto_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        horario: '17:00 a 00:00',
        cerrado: true
      },
      {
        id: 4,
        nombre: 'Bar-Budo',
        direccion: 'Avenida Flavio Reyes',
        foto_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        horario: '18:00 a 00:00',
        cerrado: true
      },
      {
        id: 4,
        nombre: 'QDQ Bar',
        direccion: 'Avenida Flavio Reyes',
        foto_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        horario: '17:00 a 00:00',
        cerrado: false
      }
     
    ];
    
    this.siguienteId = 6;
    this.baresSubject.next([...this.bares]);
  }
}
