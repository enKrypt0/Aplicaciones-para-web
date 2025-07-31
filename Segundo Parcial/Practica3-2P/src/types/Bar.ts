/**
 * Interface que define la estructura de una tarea en la aplicación
 * Esta es la única responsabilidad de este archivo: definir el tipo de datos Task
 */
export interface Bar {
  id: number;
  nombre: string;
  ubicacion: string;
  horario: string;
  telefono: string;
  imageUrl: string;
} 