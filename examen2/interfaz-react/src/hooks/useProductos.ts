import { useState, useEffect } from 'react';
import type { Producto } from '../interfaces/iproductos';
import { DatabaseService } from '../interfaces/database';

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const db = DatabaseService.getInstance();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        // Simular un pequeño delay para mostrar el estado de carga
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const productosData = db.getProductos();
        setProductos(productosData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const obtenerProductoPorId = (id: number): Producto | undefined => {
    return productos.find(producto => producto.id === id);
  };

  const filtrarProductos = (termino: string): Producto[] => {
    if (!termino.trim()) return productos;
    
    return productos.filter(producto =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      producto.color.toLowerCase().includes(termino.toLowerCase())
    );
  };

  const productosDisponibles = productos.filter(producto => producto.cantidad > 0);

  return {
    productos,
    productosDisponibles,
    loading,
    error,
    obtenerProductoPorId,
    filtrarProductos
  };
};
