import { useState, useEffect } from 'react';
import type { usuario, CreateUsuarioRequest } from '../types/Usuario';
import { MockUsuarioService } from '../services/MockUsuarioService';
import { UsuarioList } from './UsuarioList';
import { UserForm } from './UsuarioForm';

export const UsuarioManager = () => {
  const [usuarios, setUsuarios] = useState<usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<usuario | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await MockUsuarioService.getAllUsr();
      setUsuarios(userData);
    } catch (err) {
      setError('Error al cargar los usuarios. Verifique la conexión a la base de datos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData: CreateUsuarioRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await MockUsuarioService.createUsuario(userData);
      setUsuarios(prev => [newUser, ...prev]);
    } catch (err) {
      setError('Error al crear usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData: CreateUsuarioRequest) => {
    if (!editingUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await MockUsuarioService.updateUsuario(editingUser.id, userData);
      setUsuarios(prev => 
        prev.map(user => 
          user.id === editingUser.id ? updatedUser : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await MockUsuarioService.deleteUsr(id);
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: usuario) => {
    setEditingUser(user);
  };

  const handleCancelForm = () => {
    setEditingUser(null);
  };

  const handleSubmitForm = (userData: CreateUsuarioRequest) => {
    if (editingUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Gestión de Usuarios</h2>
        <div className="manager-stats">
          <span className="stat-badge">
            {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} registrado{usuarios.length !== 1 ? 's' : ''}
          </span>
          <button onClick={loadUsuarios} className="btn btn-refresh" disabled={loading}>
            🔄 Actualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      <div className="crud-container">
        <div className="form-section">
          <UserForm
            usuario={editingUser}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            loading={loading}
          />
        </div>
        
        <div className="list-section">
          <UsuarioList
            usuarios={usuarios}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
