import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { CarritoModal } from './CarritoModal';
import './Header.css';

export const Header: React.FC = () => {
  const { carrito } = useCarrito();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <h1 className="logo-text">Tienda Online BWS</h1>
          </div>

          {/* Navegación */}
          <nav className="navigation">
            <a href="#productos" className="nav-link">Productos</a>
            <a href="#ofertas" className="nav-link">Ofertas</a>
            <a href="#contacto" className="nav-link">Contacto</a>
          </nav>

          {/* Carrito */}
          <div className="cart-section">
            <button 
              onClick={toggleCarrito}
              className="cart-button"
              aria-label="Abrir carrito de compras"
            >
              <div className="cart-icon">
                🛒
                {carrito.cantidadTotal > 0 && (
                  <span className="cart-badge">
                    {carrito.cantidadTotal}
                  </span>
                )}
              </div>
              <div className="cart-info">
                <span className="cart-items">
                  {carrito.cantidadTotal} {carrito.cantidadTotal === 1 ? 'artículo' : 'artículos'}
                </span>
                <span className="cart-total">
                  {formatearPrecio(carrito.total)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Modal del carrito */}
      {mostrarCarrito && (
        <CarritoModal 
          onClose={() => setMostrarCarrito(false)}
        />
      )}
    </>
  );
};
