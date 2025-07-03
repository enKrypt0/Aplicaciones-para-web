//Modulo creado por Diego Velez
import { useState, useEffect } from 'react';
import type { Producto, CreateProductoRequest } from '../types/Producto';

interface ProductoFormProps {
  producto?: Producto | null;
  onSubmit: (producto: CreateProductoRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const ProductoForm = ({ producto, onSubmit, onCancel, loading }: ProductoFormProps) => {
  const [formData, setFormData] = useState<CreateProductoRequest>({
    nombre: '',
    precio: 0,
    disponible: true,
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        precio: producto.precio,
        disponible: producto.disponible,
      });
    } else {
      setFormData({
        nombre: '',
        precio: 0,
        disponible: true,
      });
    }
  }, [producto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre.trim() && formData.precio > 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'precio' ? Number(value) : value)
    }));
  };

  return (
    <div className="producto-form">
      <h2>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="disponible">¿Disponible?</label>
          <input
            type="checkbox"
            id="disponible"
            name="disponible"
            checked={formData.disponible}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : (producto ? 'Actualizar' : 'Crear')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
