import type { bar } from '../types/Bar';

interface BarListProps {
  bars: bar[];
  onEdit: (bar: bar) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export const BarList = ({ bars, onEdit, onDelete, loading }: BarListProps) => {
  if (loading) {
    return <div className="loading">Cargando bares...</div>;
  }

  if (bars.length === 0) {
    return <div className="empty-state">No hay bares disponibles</div>;
  }

  return (
    <div className="bar-list">
      <h2>Lista de Bares</h2>
      <div className="bars-grid">
        {bars.map((bar) => (
          <div key={bar.id} className="bar-card">
            <div className="bar-header">
              <h3>{bar.nombre}</h3>
              <div className="bar-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => onEdit(bar)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => onDelete(bar.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="bar-content">
              <p><strong>Ubicación:</strong> {bar.ubicacion}</p>
              <p><strong>Stack:</strong> {bar.stack}</p>
              <p><strong>Disponibilidad:</strong> {bar.disponibilidad ? 'Sí' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};