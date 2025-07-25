import { useState } from 'react';
import { UsuarioManager } from './components/UsuarioManager';
import { ProductoManager } from './components/ProductoManager';
import { BarManager } from './components/BarManager';
import './App.css';

type TabType = 'usuarios' | 'productos' | 'bares';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('usuarios');

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return <UsuarioManager />;
      case 'productos':
        return <ProductoManager />;
      case 'bares':
        return <BarManager />;
      default:
        return <UsuarioManager />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Gestión Integral</h1>
        <div className="header-info">
          <span className="app-description">
            Gestión completa de Usuarios, Productos y Bares
          </span>
        </div>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('usuarios')}
        >
          👥 Usuarios
        </button>
        <button
          className={`tab-button ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          📦 Productos
        </button>
        <button
          className={`tab-button ${activeTab === 'bares' ? 'active' : ''}`}
          onClick={() => setActiveTab('bares')}
        >
          🍺 Bares
        </button>
      </nav>

      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;