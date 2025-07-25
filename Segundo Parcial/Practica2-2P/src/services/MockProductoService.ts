import type { Producto, CreateProductoRequest } from '../types/Producto';

// Datos de ejemplo
let mockProductos: Producto[] = [
  {
    id: 1,
    nombre: 'Cerveza Artesanal IPA',
    precio: 5.99,
    disponible: true
  },
  {
    id: 2,
    nombre: 'Whisky Premium',
    precio: 45.00,
    disponible: true
  },
  {
    id: 3,
    nombre: 'Vino Tinto Reserva',
    precio: 18.50,
    disponible: false
  },
  {
    id: 4,
    nombre: 'Cocktail Mojito',
    precio: 8.75,
    disponible: true
  }
];

let nextId = 5;

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockProductoService = {
  async getAllProductos(): Promise<Producto[]> {
    await delay(500);
    return [...mockProductos];
  },

  async getProductoById(id: string): Promise<Producto> {
    await delay(300);
    const producto = mockProductos.find(p => p.id === parseInt(id));
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  },

  async createProducto(productoData: CreateProductoRequest): Promise<Producto> {
    await delay(800);
    const newProducto: Producto = {
      id: nextId,
      ...productoData
    };
    nextId++;
    mockProductos.unshift(newProducto);
    return newProducto;
  },

  async updateProducto(id: string, productoData: CreateProductoRequest): Promise<Producto> {
    await delay(600);
    const index = mockProductos.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Producto no encontrado para actualizar');
    }
    
    const updatedProducto: Producto = {
      ...mockProductos[index],
      ...productoData
    };
    
    mockProductos[index] = updatedProducto;
    return updatedProducto;
  },

  async deleteProducto(id: string): Promise<void> {
    await delay(400);
    const index = mockProductos.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Producto no encontrado para eliminar');
    }
    mockProductos.splice(index, 1);
  }
};
