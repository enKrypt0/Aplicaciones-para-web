import { useState, useEffect } from 'react';
import type { bar, CreateBarRequest } from './types/Bar';
import { barService } from './services/BarService';
import { BarList } from './components/BarList';
import { BarForm } from './components/BarForm';
import type { usuario, CreateUsuarioRequest } from './types/Usuario';
import { UsuarioServiceV2 } from './services/UsuarioServiceV2';
import { UsuarioList } from './components/UsuarioListV2';
import { UsuarioForm } from './components/UsuarioForm';
import type { Producto, CreateProductoRequest } from './types/Producto';
import { ProductoServiceV2 } from './services/ProductoServiceV2';
import { ProductoList } from './components/ProductoListV2';
import { ProductoForm } from './components/ProductoForm';
import './App.css';

function App() {
  // Bares
  const [bars, setBars] = useState<bar[]>([]);
  const [loadingBars, setLoadingBars] = useState(false);
  const [editingBar, setEditingBar] = useState<bar | null>(null);
  const [showBarForm, setShowBarForm] = useState(false);
  // Usuarios
  const [usuarios, setUsuarios] = useState<usuario[]>([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<usuario | null>(null);
  const [showUsuarioForm, setShowUsuarioForm] = useState(false);
  // Productos
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [showProductoForm, setShowProductoForm] = useState(false);
  // Errores
  const [error, setError] = useState<string | null>(null);

  // Bares
  useEffect(() => { loadBars(); }, []);
  const loadBars = async () => {
    setLoadingBars(true); setError(null);
    try { setBars(await barService.getAllBar()); } catch { setError('Error al cargar los bares'); }
    setLoadingBars(false);
  };
  const handleCreateBar = async (data: CreateBarRequest) => {
    setLoadingBars(true); setError(null);
    try { const newBar = await barService.createBar(data); setBars(prev => [newBar, ...prev]); setShowBarForm(false); } catch { setError('Error al crear el bar'); }
    setLoadingBars(false);
  };
  const handleUpdateBar = async (data: CreateBarRequest) => {
    if (!editingBar) return;
    setLoadingBars(true); setError(null);
    try {
      const updated = await barService.updateBar(editingBar.id.toString(), data);
      setBars(prev => prev.map(bar => bar.id === editingBar.id ? updated : bar));
      setEditingBar(null); setShowBarForm(false);
    } catch { setError('Error al actualizar el bar'); }
    setLoadingBars(false);
  };
  const handleDeleteBar = async (id: number) => {
    setLoadingBars(true); setError(null);
    try { await barService.deleteBar(id.toString()); setBars(prev => prev.filter(bar => bar.id !== id)); } catch { setError('Error al eliminar el bar'); }
    setLoadingBars(false);
  };

  // Usuarios
  useEffect(() => { loadUsuarios(); }, []);
  const loadUsuarios = async () => {
    setLoadingUsuarios(true); setError(null);
    try { setUsuarios(await UsuarioServiceV2.getAllUsuarios()); } catch { setError('Error al cargar los usuarios'); }
    setLoadingUsuarios(false);
  };
  const handleCreateUsuario = async (data: CreateUsuarioRequest) => {
    setLoadingUsuarios(true); setError(null);
    try { const nuevo = await UsuarioServiceV2.createUsuario(data); setUsuarios(prev => [nuevo, ...prev]); setShowUsuarioForm(false); } catch { setError('Error al crear el usuario'); }
    setLoadingUsuarios(false);
  };
  const handleUpdateUsuario = async (data: CreateUsuarioRequest) => {
    if (!editingUsuario) return;
    setLoadingUsuarios(true); setError(null);
    try {
      const actualizado = await UsuarioServiceV2.updateUsuario(editingUsuario.id.toString(), data);
      setUsuarios(prev => prev.map(u => u.id === editingUsuario.id ? actualizado : u));
      setEditingUsuario(null); setShowUsuarioForm(false);
    } catch { setError('Error al actualizar el usuario'); }
    setLoadingUsuarios(false);
  };
  const handleDeleteUsuario = async (id: number) => {
    setLoadingUsuarios(true); setError(null);
    try { await UsuarioServiceV2.deleteUsuario(id.toString()); setUsuarios(prev => prev.filter(u => u.id !== id)); } catch { setError('Error al eliminar el usuario'); }
    setLoadingUsuarios(false);
  };

  // Productos
  useEffect(() => { loadProductos(); }, []);
  const loadProductos = async () => {
    setLoadingProductos(true); setError(null);
    try { setProductos(await ProductoServiceV2.getAllProductos()); } catch { setError('Error al cargar los productos'); }
    setLoadingProductos(false);
  };
  const handleCreateProducto = async (data: CreateProductoRequest) => {
    setLoadingProductos(true); setError(null);
    try { const nuevo = await ProductoServiceV2.createProducto(data); setProductos(prev => [nuevo, ...prev]); setShowProductoForm(false); } catch { setError('Error al crear el producto'); }
    setLoadingProductos(false);
  };
  const handleUpdateProducto = async (data: CreateProductoRequest) => {
    if (!editingProducto) return;
    setLoadingProductos(true); setError(null);
    try {
      const actualizado = await ProductoServiceV2.updateProducto(editingProducto.id.toString(), data);
      setProductos(prev => prev.map(p => p.id === editingProducto.id ? actualizado : p));
      setEditingProducto(null); setShowProductoForm(false);
    } catch { setError('Error al actualizar el producto'); }
    setLoadingProductos(false);
  };
  const handleDeleteProducto = async (id: number) => {
    setLoadingProductos(true); setError(null);
    try { await ProductoServiceV2.deleteProducto(id.toString()); setProductos(prev => prev.filter(p => p.id !== id)); } catch { setError('Error al eliminar el producto'); }
    setLoadingProductos(false);
  };

  return (
    <div className="app-container">
      <h1>Gestión de Bares, Usuarios y Productos</h1>
      {error && <div className="error">{error}</div>}
      {/* Bares */}
      <section>
        <h2>Bares</h2>
        <button onClick={() => { setEditingBar(null); setShowBarForm(true); }}>Nuevo Bar</button>
        {showBarForm && (
          <BarForm
            bar={editingBar}
            onSubmit={editingBar ? handleUpdateBar : handleCreateBar}
            onCancel={() => { setEditingBar(null); setShowBarForm(false); }}
            loading={loadingBars}
          />
        )}
        <BarList
          bars={bars}
          onEdit={bar => { setEditingBar(bar); setShowBarForm(true); }}
          onDelete={handleDeleteBar}
          loading={loadingBars}
        />
      </section>
      {/* Usuarios */}
      <section>
        <h2>Usuarios</h2>
        <button onClick={() => { setEditingUsuario(null); setShowUsuarioForm(true); }}>Nuevo Usuario</button>
        {showUsuarioForm && (
          <UsuarioForm
            usuario={editingUsuario}
            onSubmit={editingUsuario ? handleUpdateUsuario : handleCreateUsuario}
            onCancel={() => { setEditingUsuario(null); setShowUsuarioForm(false); }}
            loading={loadingUsuarios}
          />
        )}
        <UsuarioList
          usuarios={usuarios}
          onEdit={usuario => { setEditingUsuario(usuario); setShowUsuarioForm(true); }}
          onDelete={handleDeleteUsuario}
          loading={loadingUsuarios}
        />
      </section>
      {/* Productos */}
      <section>
        <h2>Productos</h2>
        <button onClick={() => { setEditingProducto(null); setShowProductoForm(true); }}>Nuevo Producto</button>
        {showProductoForm && (
          <ProductoForm
            producto={editingProducto}
            onSubmit={editingProducto ? handleUpdateProducto : handleCreateProducto}
            onCancel={() => { setEditingProducto(null); setShowProductoForm(false); }}
            loading={loadingProductos}
          />
        )}
        <ProductoList
          productos={productos}
          onEdit={producto => { setEditingProducto(producto); setShowProductoForm(true); }}
          onDelete={handleDeleteProducto}
          loading={loadingProductos}
        />
      </section>
    </div>
  );
}

export default App;