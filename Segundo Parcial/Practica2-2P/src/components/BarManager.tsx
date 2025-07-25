import { useState, useEffect } from 'react';
import type { bar, CreateBarRequest } from '../types/Bar';
import { MockBarService } from '../services/MockBarService';
import { BarForm } from './BarForm';
import { BarList } from './BarList';

export const BarManager = () => {
  const [bares, setBares] = useState<bar[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingBar, setEditingBar] = useState<bar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBares();
  }, []);

  const loadBares = async () => {
    try {
      setLoading(true);
      setError(null);
      const baresData = await MockBarService.getAllBar();
      setBares(baresData);
    } catch (err) {
      setError('Error al cargar los bares. Verifique la conexión a la base de datos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBar = async (barData: CreateBarRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newBar = await MockBarService.createBar(barData);
      setBares(prev => [newBar, ...prev]);
    } catch (err) {
      setError('Error al crear bar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBar = async (barData: CreateBarRequest) => {
    if (!editingBar) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedBar = await MockBarService.updateBar(editingBar.id.toString(), barData);
      setBares(prev => 
        prev.map(bar => 
          bar.id === editingBar.id ? updatedBar : bar
        )
      );
      setEditingBar(null);
    } catch (err) {
      setError('Error al actualizar el bar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBar = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este bar?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await MockBarService.deleteBar(id.toString());
      setBares(prev => prev.filter(bar => bar.id !== id));
    } catch (err) {
      setError('Error al eliminar el bar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBar = (bar: bar) => {
    setEditingBar(bar);
  };

  const handleCancelForm = () => {
    setEditingBar(null);
  };

  const handleSubmitForm = (barData: CreateBarRequest) => {
    if (editingBar) {
      handleUpdateBar(barData);
    } else {
      handleCreateBar(barData);
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Gestión de Bares</h2>
        <div className="manager-stats">
          <span className="stat-badge">
            {bares.length} bar{bares.length !== 1 ? 'es' : ''} registrado{bares.length !== 1 ? 's' : ''}
          </span>
          <button onClick={loadBares} className="btn btn-refresh" disabled={loading}>
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
          <BarForm
            bar={editingBar}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            loading={loading}
          />
        </div>
        
        <div className="list-section">
          <BarList
            bars={bares}
            onEdit={handleEditBar}
            onDelete={handleDeleteBar}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
