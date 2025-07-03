import type { Producto, CreateProductoRequest } from '../types/Producto';

const SUPABASE_URL = 'https://arjjnnyvymlqtwtryen.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocmpqbm55dnltbHF0d3RyeWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODc2MTYsImV4cCI6MjA2NzA2MzYxNn0.ooRlaMfdAVEsSVeJXOSEBldNp1hFwe8md06QH3sVnrQ';
const API_BASE_URL = `${SUPABASE_URL}/rest/v1/producto`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'apikey': SUPABASE_ANON_KEY
});

export const ProductoServiceV2 = {
  async getAllProductos(): Promise<Producto[]> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productos = await response.json();
      return productos;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async getProductoById(id: string): Promise<Producto> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const productos = await response.json();
      if (productos.length === 0) {
        throw new Error('Producto no encontrado');
      }
      return productos[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createProducto(producto: CreateProductoRequest): Promise<Producto> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(producto),
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      const createdProductos = await response.json();
      return createdProductos[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async updateProducto(id: string, producto: CreateProductoRequest): Promise<Producto> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...getHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(producto),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      const updatedProductos = await response.json();
      if (updatedProductos.length === 0) {
        throw new Error('Producto no encontrado para actualizar');
      }
      return updatedProductos[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async deleteProducto(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
