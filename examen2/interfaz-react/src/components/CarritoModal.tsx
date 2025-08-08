import React from 'react';

interface CarritoModalProps {
  onClose: () => void;
}

export const CarritoModal: React.FC<CarritoModalProps> = ({ onClose }) => {
  return (
    <div className="carrito-modal">
      <div className="carrito-modal-content">
        <button className="carrito-modal-close" onClick={onClose}>
          Cerrar
        </button>
        <h2>Carrito de Compras</h2>
        {/* Aquí puedes agregar el contenido del carrito */}
        <p>El carrito está vacío.</p>
      </div>
    </div>
  );
};