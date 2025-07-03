import type { usuario } from '../types/Usuario';

interface UsuarioListProps {
  usuarios: usuario[];
  onEdit: (usuario: usuario) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export const UsuarioList = ({ usuarios, onEdit, onDelete, loading }: UsuarioListProps) => {
  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  if (usuarios.length === 0) {
    return <div className="empty-state">No hay usuarios disponibles</div>;
  }

  return (
    <div className="usuario-list">
      <h2>Lista de Usuarios</h2>
      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <div className="usuario-header">
              <h3>{usuario.nombre}</h3>
              <div className="usuario-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => onEdit(usuario)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => onDelete(usuario.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="usuario-content">
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Dirección:</strong> {usuario.direccion}</p>
              <p><strong>Teléfono:</strong> {usuario.telefono}</p>
              <p><strong>Estado:</strong> {usuario.estado ? 'Activo' : 'Inactivo'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
