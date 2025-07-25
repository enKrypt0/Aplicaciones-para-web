
import { useState, useEffect } from 'react';
import type { usuario, CreateUsuarioRequest } from '../types/Usuario';

interface UserFormProps {
  usuario?: usuario | null;
  onSubmit: (usuario: CreateUsuarioRequest) => void;
  onCancel: () => void;
  loading: boolean;
}

export const UserForm = ({ usuario, onSubmit, onCancel, loading }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUsuarioRequest>({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const [errors, setErrors] = useState<Partial<CreateUsuarioRequest>>({});

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        direccion: usuario.direccion,
        telefono: usuario.telefono
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        direccion: '',
        telefono: ''
      });
    }
    setErrors({});
  }, [usuario]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUsuarioRequest> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 10) {
      newErrors.direccion = 'La dirección debe ser más específica';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{8,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un teléfono válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof CreateUsuarioRequest]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="Usr-form">
      <h2>{usuario ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ingrese el nombre completo"
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>

         <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="ejemplo@correo.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
         <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Calle, número, ciudad, código postal"
            className={errors.direccion ? 'error' : ''}
          />
          {errors.direccion && <span className="error-text">{errors.direccion}</span>}
        </div>
        
         <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="+1 234 567 8900"
            className={errors.telefono ? 'error' : ''}
          />
          {errors.telefono && <span className="error-text">{errors.telefono}</span>}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (usuario ? 'Actualizar Usuario' : 'Crear Usuario')}
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
      </form>
    </div>
  );
}; 
