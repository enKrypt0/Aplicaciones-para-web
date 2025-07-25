import type { usuario } from '../types/Usuario';

interface UsrListProps {
  usuarios: usuario[];
  onEdit: (movie: usuario) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export const UsuarioList = ({ usuarios, onEdit, onDelete, loading }: UsrListProps) => {
  if (loading) {
    return <div className="loading">Cargando usuarios...</div>;
  }

  if (usuarios.length === 0) {
    return <div className="empty-state">No hay usuarios disponibles</div>;
  }

  return (
    <div className="user-list">
      <h2>Lista de usuarios</h2>
      <div className="users-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usr-card">
            <div className="usr-header">
              <h3>{usuario.nombre}</h3>
              <div className="usr-actions">
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
            <div className="usr-content">
              <div className="usr-info">
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Dirección:</strong> {usuario.direccion}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>Estado:</strong> {usuario.estado ? 'Activo' : 'Inactivo'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 