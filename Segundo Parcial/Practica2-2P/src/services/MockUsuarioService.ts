import type { usuario, CreateUsuarioRequest } from '../types/Usuario';

// Datos de ejemplo
let mockUsuarios: usuario[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    direccion: 'Av. Principal 123, Ciudad, CP 12345',
    telefono: '+1 234 567 8900',
    estado: true
  },
  {
    id: '2',
    nombre: 'María García',
    email: 'maria.garcia@email.com',
    direccion: 'Calle Secundaria 456, Ciudad, CP 54321',
    telefono: '+1 234 567 8901',
    estado: true
  },
  {
    id: '3',
    nombre: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@email.com',
    direccion: 'Plaza Central 789, Ciudad, CP 67890',
    telefono: '+1 234 567 8902',
    estado: false
  }
];

let nextId = 4;

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockUsuarioService = {
  async getAllUsr(): Promise<usuario[]> {
    await delay(500);
    return [...mockUsuarios];
  },

  async getUsrById(id: string): Promise<usuario> {
    await delay(300);
    const usuario = mockUsuarios.find(u => u.id === id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  },

  async createUsuario(usuarioData: CreateUsuarioRequest): Promise<usuario> {
    await delay(800);
    const newUsuario: usuario = {
      id: nextId.toString(),
      ...usuarioData,
      estado: true
    };
    nextId++;
    mockUsuarios.unshift(newUsuario);
    return newUsuario;
  },

  async updateUsuario(id: string, usuarioData: CreateUsuarioRequest): Promise<usuario> {
    await delay(600);
    const index = mockUsuarios.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado para actualizar');
    }
    
    const updatedUsuario: usuario = {
      ...mockUsuarios[index],
      ...usuarioData
    };
    
    mockUsuarios[index] = updatedUsuario;
    return updatedUsuario;
  },

  async deleteUsr(id: string): Promise<void> {
    await delay(400);
    const index = mockUsuarios.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuario no encontrado para eliminar');
    }
    mockUsuarios.splice(index, 1);
  }
};
