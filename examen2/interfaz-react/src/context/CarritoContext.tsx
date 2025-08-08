import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Carrito } from '../interfaces/icarrito';
import type { ICarritoItem } from '../interfaces/icarritoItem';
import type { Producto } from '../interfaces/iproductos';
import { DatabaseService } from '../interfaces/database';

interface CarritoContextType {
  carrito: Carrito;
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
  eliminarDelCarrito: (productoId: number) => void;
  actualizarCantidad: (productoId: number, nuevaCantidad: number) => void;
  vaciarCarrito: () => void;
  obtenerCantidadEnCarrito: (productoId: number) => number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

interface CarritoProviderProps {
  children: React.ReactNode;
}

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<Carrito>({
    items: [],
    total: 0,
    cantidadTotal: 0
  });

  const db = DatabaseService.getInstance();

  // Calcular totales del carrito
  const calcularTotales = (items: ICarritoItem[]): { total: number; cantidadTotal: number } => {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const cantidadTotal = items.reduce((sum, item) => sum + item.cantidadSeleccionada, 0);
    return { total, cantidadTotal };
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    setCarrito(prevCarrito => {
      const existingItem = prevCarrito.items.find(item => item.producto.id === producto.id);
      
      let newItems: ICarritoItem[];
      
      if (existingItem) {
        // Si el producto ya existe, actualizar la cantidad
        newItems = prevCarrito.items.map(item =>
          item.producto.id === producto.id
            ? {
                ...item,
                cantidadSeleccionada: item.cantidadSeleccionada + cantidad,
                subtotal: (item.cantidadSeleccionada + cantidad) * producto.precio
              }
            : item
        );
      } else {
        // Si es un producto nuevo, agregarlo
        const newItem: ICarritoItem = {
          producto,
          cantidadSeleccionada: cantidad,
          subtotal: cantidad * producto.precio
        };
        newItems = [...prevCarrito.items, newItem];
      }

      const { total, cantidadTotal } = calcularTotales(newItems);
      
      const newCarrito: Carrito = {
        items: newItems,
        total,
        cantidadTotal
      };

      // Guardar en el servicio de base de datos (simulado para cliente ID 1)
      db.setCarrito(1, newCarrito);
      
      return newCarrito;
    });
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(prevCarrito => {
      const newItems = prevCarrito.items.filter(item => item.producto.id !== productoId);
      const { total, cantidadTotal } = calcularTotales(newItems);
      
      const newCarrito: Carrito = {
        items: newItems,
        total,
        cantidadTotal
      };

      db.setCarrito(1, newCarrito);
      
      return newCarrito;
    });
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }

    setCarrito(prevCarrito => {
      const newItems = prevCarrito.items.map(item =>
        item.producto.id === productoId
          ? {
              ...item,
              cantidadSeleccionada: nuevaCantidad,
              subtotal: nuevaCantidad * item.producto.precio
            }
          : item
      );

      const { total, cantidadTotal } = calcularTotales(newItems);
      
      const newCarrito: Carrito = {
        items: newItems,
        total,
        cantidadTotal
      };

      db.setCarrito(1, newCarrito);
      
      return newCarrito;
    });
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    const carritoVacio: Carrito = {
      items: [],
      total: 0,
      cantidadTotal: 0
    };
    
    setCarrito(carritoVacio);
    db.setCarrito(1, carritoVacio);
  };

  // Obtener cantidad de un producto específico en el carrito
  const obtenerCantidadEnCarrito = (productoId: number): number => {
    const item = carrito.items.find(item => item.producto.id === productoId);
    return item ? item.cantidadSeleccionada : 0;
  };

  // Cargar carrito desde la base de datos al inicializar
  useEffect(() => {
    const carritoGuardado = db.getCarrito(1);
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);

  const value: CarritoContextType = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    obtenerCantidadEnCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
