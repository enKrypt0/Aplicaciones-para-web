import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { useProductos } from '../hooks/useProductos';
import type { Producto } from '../interfaces/iproductos';
import './ProductGrid.css';

export const ProductGrid: React.FC = () => {
  const { productos, productosDisponibles, loading, error, filtrarProductos } = useProductos();
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mostrarSoloDisponibles, setMostrarSoloDisponibles] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>¡Ups! Algo salió mal</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  // Filtrar productos según los criterios
  let productosFiltrados: Producto[] = productos;
  
  if (terminoBusqueda.trim()) {
    productosFiltrados = filtrarProductos(terminoBusqueda);
  }
  
  if (mostrarSoloDisponibles) {
    productosFiltrados = productosFiltrados.filter(producto => producto.cantidad > 0);
  }

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminoBusqueda(e.target.value);
  };

  const handleFiltroDisponiblesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMostrarSoloDisponibles(e.target.checked);
  };

  return (
    <div className="product-grid-container">
      {/* Header de la tienda */}
      <div className="store-header">
        <h1 className="store-title">BWS</h1>
        <p className="store-subtitle">
          Descubre nuestra colección de productos de alta calidad
        </p>
      </div>

      {/* Controles de filtrado */}
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos por nombre o color..."
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
            className="search-input"
          />
          <div className="search-icon">
            🔍
          </div>
        </div>

        <div className="filter-options">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={mostrarSoloDisponibles}
              onChange={handleFiltroDisponiblesChange}
            />
            <span className="checkmark"></span>
            Solo productos disponibles
          </label>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">{productosFiltrados.length}</span>
          <span className="stat-label">
            {productosFiltrados.length === 1 ? 'Producto encontrado' : 'Productos encontrados'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{productosDisponibles.length}</span>
          <span className="stat-label">Disponibles</span>
        </div>
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length > 0 ? (
        <div className="products-grid">
          {productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
            />
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          <div className="no-products-icon">📦</div>
          <h3>No se encontraron productos</h3>
          <p>
            {terminoBusqueda.trim() 
              ? `No hay productos que coincidan con "${terminoBusqueda}"`
              : 'No hay productos disponibles en este momento'
            }
          </p>
          {terminoBusqueda.trim() && (
            <button 
              onClick={() => setTerminoBusqueda('')}
              className="clear-search-button"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}
    </div>
  );
};
