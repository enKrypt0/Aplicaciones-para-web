import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iusuario } from '../models/iusuario';

/**
 * Servicio para gestionar las operaciones CRUD de bebidas
 * Utiliza un BehaviorSubject para mantener el estado reactivo
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  // Array privado para almacenar los usuarios
  private usuarios: Iusuario[] = [
    {
      id: 1,
      nombre_usuario: '',
      email: '',
      telefono: '',
      direccion: '',
      fecha_nacimiento: '',
    },
  ];

  // Subject para emitir cambios en las bebidas
  private usuariosSubject = new BehaviorSubject<Iusuario[]>(this.usuarios);
  
  // Observable público para que los componentes se suscriban
  public usuarios$ = this.usuariosSubject.asObservable();

  // Contador para generar IDs únicos
  private siguienteId = 6;

  constructor() { }

  /**
   * Obtiene todas los bares como Observable
   * @returns Observable con el array de bebidas
   */
  obtenerusuarios(): Observable<Iusuario[]> {
    return this.usuarios$;
  }

  /**
   * Obtiene una bebida por su ID
   * @param id ID de la bebida
   * @returns La bebida encontrada o undefined
   */
  obtenerUsuarioPorId(id: number): Iusuario | undefined {
    return this.usuarios.find(usuarios => usuarios.id === id);
  }

  /**
   * Agrega una nueva bebida
   * @param nuevaBebida Datos de la nueva bebida (sin ID)
   * @returns La bebida creada con su ID
   */
  agregarUsuarios(nuevoUsuario: Omit<Iusuario, 'id'>):  Iusuario{
    const usuario: Iusuario = {
      id: this.siguienteId++,
      ...nuevoUsuario
    };

    this.usuarios.push(usuario);
    this.usuariosSubject.next([...this.usuarios]);
    
    return usuario;
  }

  /**
   * Actualiza una bebida existente
   * @param id ID de la bebida a actualizar
   * @param datosActualizados Nuevos datos de la bebida
   * @returns La bebida actualizada o null si no se encontró
   */
  actualizarUsuarios(id: number, datosActualizados: Partial<Iusuario>): Iusuario | null {
    const indice = this.usuarios.findIndex(usuarios => usuarios.id === id);
    
    if (indice === -1) {
      return null;
    }

    // Actualizar la bebida manteniendo el ID original
    this.usuarios[indice] = {
      ...this.usuarios[indice],
      ...datosActualizados,
      id: id // Asegurar que el ID no cambie
    };

    this.usuariosSubject.next([...this.usuarios]);
    
    return this.usuarios[indice];
  }

  /**
   * Elimina un bar por su ID
   * @param id ID de la bebida a eliminar
   * @returns true si se eliminó, false si no se encontró
   */
  eliminarUsuario(id: number): boolean {
    const indiceInicial = this.usuarios.length;
    this.usuarios = this.usuarios.filter(usuarios => usuarios.id !== id);
    
    if (this.usuarios.length < indiceInicial) {
      this.usuariosSubject.next([...this.usuarios]);
      return true;
    }
    
    return false;
  }


  /**
   * Busca bebidas por nombre (búsqueda parcial, case-insensitive)
   * @param termino Término de búsqueda
   * @returns Array de bebidas que coinciden con la búsqueda
   */
  buscarUsuarios(termino: string): Iusuario[] {
    if (!termino.trim()) {
      return this.usuarios;
    }
    
    const terminoLower = termino.toLowerCase().trim();
    return this.usuarios.filter(bares => 
      bares.nombre_usuario.toLowerCase().includes(terminoLower)
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
    this.usuarios = [
      {
        id: 1,
        nombre_usuario: 'Johnie Walker',
        email: 'es@un.elisir',
        telefono: '0123456789',
        direccion: 'Calle Falsa y Avenida genérica',
        fecha_nacimiento: '19-12-1919',
      },
      {
        id: 2,
        nombre_usuario: 'Jack Daniel',
        email: 'elbourbon@tenesse.com',
        telefono: '0123456779',
        direccion: 'Calle Falsa3 y Avenida genérica 2',
        fecha_nacimiento: '19-12-1919',
      }
     
    ];
    
    this.siguienteId = 6;
    this.usuariosSubject.next([...this.usuarios]);
  }
}
