import React, { useState } from 'react';
import type { Producto } from '../interfaces/iproductos';
import { useCarrito } from '../context/CarritoContext';
import './ProductCard.css';

interface ProductCardProps {
  producto: Producto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [agregandoAlCarrito, setAgregandoAlCarrito] = useState(false);
  const { agregarAlCarrito, obtenerCantidadEnCarrito } = useCarrito();

  const cantidadEnCarrito = obtenerCantidadEnCarrito(producto.id);
  const cantidadDisponible = producto.cantidad - cantidadEnCarrito;

  const handleAgregarAlCarrito = async () => {
    if (cantidad > cantidadDisponible) return;

    setAgregandoAlCarrito(true);
    
    try {
      agregarAlCarrito(producto, cantidad);
      
      // Simular un pequeño delay para mostrar feedback visual
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Resetear cantidad a 1 después de agregar
      setCantidad(1);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    } finally {
      setAgregandoAlCarrito(false);
    }
  };

  const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  const handleCantidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCantidad(Number(e.target.value));
  };

  const estaAgotado = cantidadDisponible <= 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="product-image"
          onError={(e) => {
            // Imagen por defecto si no se puede cargar
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        {estaAgotado && (
          <div className="out-of-stock-overlay">
            <span>Agotado</span>
          </div>
        )}
        {cantidadEnCarrito > 0 && (
          <div className="in-cart-badge">
            {cantidadEnCarrito} en carrito
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{producto.nombre}</h3>
        
        <div className="product-details">
          <div className="product-color">
            <span className="detail-label">Color:</span>
            <span className="detail-value">{producto.color}</span>
          </div>
          
          <div className="product-weight">
            <span className="detail-label">Peso:</span>
            <span className="detail-value">{producto.peso}kg</span>
          </div>
          
          <div className="product-stock">
            <span className="detail-label">Disponible:</span>
            <span className={`detail-value ${cantidadDisponible <= 5 ? 'low-stock' : ''}`}>
              {cantidadDisponible} unidades
            </span>
          </div>
        </div>

        <div className="product-price">
          {formatearPrecio(producto.precio)}
        </div>

        {!estaAgotado && (
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor={`cantidad-${producto.id}`} className="quantity-label">
                Cantidad:
              </label>
              <select
                id={`cantidad-${producto.id}`}
                value={cantidad}
                onChange={handleCantidadChange}
                className="quantity-select"
                disabled={agregandoAlCarrito}
              >
                {Array.from({ length: Math.min(cantidadDisponible, 10) }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAgregarAlCarrito}
              disabled={estaAgotado || agregandoAlCarrito || cantidad > cantidadDisponible}
              className={`add-to-cart-btn ${agregandoAlCarrito ? 'adding' : ''}`}
            >
              {agregandoAlCarrito ? (
                <>
                  <span className="loading-spinner"></span>
                  Agregando...
                </>
              ) : (
                'Agregar al Carrito'
              )}
            </button>
          </div>
        )}

        {estaAgotado && (
          <div className="out-of-stock-message">
            Producto no disponible
          </div>
        )}
      </div>
    </div>
  );
};
