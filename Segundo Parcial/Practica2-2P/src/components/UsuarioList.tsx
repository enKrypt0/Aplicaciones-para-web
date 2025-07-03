import { useEffect, useState } from 'react';
import type { usuario, CreateUsuarioRequest } from '../types/Usuario';
import { UsuarioServiceV2 } from '../services/UsuarioServiceV2';

function UsuarioForm({ onUsuarioCreado }: { onUsuarioCreado: () => void }) {
  const [form, setForm] = useState<CreateUsuarioRequest>({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    estado: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UsuarioServiceV2.createUsuario(form);
      setForm({ nombre: '', email: '', direccion: '', telefono: '', estado: true });
      onUsuarioCreado();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" required />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
      <label>
        Activo
        <input name="estado" type="checkbox" checked={form.estado} onChange={handleChange} />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Agregar Usuario'}</button>
    </form>
  );
}

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState<usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await UsuarioServiceV2.getAllUsuarios();
      setUsuarios(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <UsuarioForm onUsuarioCreado={cargarUsuarios} />
      {loading ? <p>Cargando...</p> : (
        usuarios.length === 0 ? <p>No hay usuarios.</p> :
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nombre} - {usuario.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}