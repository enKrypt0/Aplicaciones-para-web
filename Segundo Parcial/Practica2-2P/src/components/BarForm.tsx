import { useState, useEffect } from 'react';
import type { bar, CreateBarRequest } from '../types/Bar';

interface BarFormProps {
  bar?: bar | null;
  onSubmit: (bar: CreateBarRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const BarForm = ({ bar, onSubmit, onCancel, loading }: BarFormProps) => {
  const [formData, setFormData] = useState<CreateBarRequest>({
    nombre: '',
    ubicacion: '',
    stack: '',
    disponibilidad: false,
  });

  useEffect(() => {
    if (bar) {
      setFormData({
        nombre: bar.nombre,
        ubicacion: bar.ubicacion,
        stack: bar.stack,
        disponibilidad: bar.disponibilidad,
      });
    } else {
      setFormData({
        nombre: '',
        ubicacion: '',
        stack: '',
        disponibilidad: false,
      });
    }
  }, [bar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre.trim() && formData.ubicacion.trim() && formData.stack.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bar-form">
      <h2>{bar ? 'Editar Bar' : 'Nuevo Bar'}</h2>
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
          <label htmlFor="ubicacion">Ubicacion</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stack">Stack</label>
          <textarea
            id="stack"
            name="stack"
            value={formData.stack}
            onChange={handleChange}
            rows={4}
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (bar ? 'Actualizar' : 'Crear')}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="disponibilidad">¿Disponible?</label>
          <input
            type="checkbox"
            id="disponibilidad"
            name="disponibilidad"
            checked={formData.disponibilidad}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                disponibilidad: e.target.checked,
              }))
            }
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};