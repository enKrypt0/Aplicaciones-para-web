//Modulo creado por Diego Velez
import type { Producto } from '../types/Producto';

interface ProductoListProps {
  productos: Producto[];
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export const ProductoList = ({ productos, onEdit, onDelete, loading }: ProductoListProps) => {
  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (productos.length === 0) {
    return <div className="empty-state">No hay productos disponibles</div>;
  }

  return (
    <div className="producto-list">
      <h2>Lista de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div className="producto-header">
              <h3>{producto.nombre}</h3>
              <div className="producto-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => onEdit(producto)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => onDelete(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="producto-content">
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Disponible:</strong> {producto.disponible ? 'Sí' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
