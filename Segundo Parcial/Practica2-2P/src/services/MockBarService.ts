import type { bar, CreateBarRequest } from '../types/Bar';

// Datos de ejemplo
let mockBares: bar[] = [
  {
    id: 1,
    nombre: 'El Rincón del Jazz',
    ubicacion: 'Centro Histórico, Calle 5 #123',
    stack: 'Jazz, Blues, Soul',
    disponibilidad: true
  },
  {
    id: 2,
    nombre: 'Brewhouse Central',
    ubicacion: 'Zona Rosa, Av. Principal 456',
    stack: 'Cervezas Artesanales, Rock',
    disponibilidad: true
  },
  {
    id: 3,
    nombre: 'Lounge Sunset',
    ubicacion: 'Distrito Financiero, Torre 789',
    stack: 'Cocktails, Lounge Music',
    disponibilidad: false
  },
  {
    id: 4,
    nombre: 'Pub Irlandés',
    ubicacion: 'Barrio Tradicional, Plaza Central',
    stack: 'Música Tradicional, Whisky',
    disponibilidad: true
  }
];

let nextId = 5;

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockBarService = {
  async getAllBar(): Promise<bar[]> {
    await delay(500);
    return [...mockBares];
  },

  async getBarById(id: string): Promise<bar> {
    await delay(300);
    const bar = mockBares.find(b => b.id === parseInt(id));
    if (!bar) {
      throw new Error('Bar no encontrado');
    }
    return bar;
  },

  async createBar(barData: CreateBarRequest): Promise<bar> {
    await delay(800);
    const newBar: bar = {
      id: nextId,
      ...barData
    };
    nextId++;
    mockBares.unshift(newBar);
    return newBar;
  },

  async updateBar(id: string, barData: CreateBarRequest): Promise<bar> {
    await delay(600);
    const index = mockBares.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
      throw new Error('Bar no encontrado para actualizar');
    }
    
    const updatedBar: bar = {
      ...mockBares[index],
      ...barData
    };
    
    mockBares[index] = updatedBar;
    return updatedBar;
  },

  async deleteBar(id: string): Promise<void> {
    await delay(400);
    const index = mockBares.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
      throw new Error('Bar no encontrado para eliminar');
    }
    mockBares.splice(index, 1);
  }
};
