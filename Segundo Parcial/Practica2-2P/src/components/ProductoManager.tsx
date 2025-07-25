import { useState, useEffect } from 'react';
import type { Producto, CreateProductoRequest } from '../types/Producto';
import { MockProductoService } from '../services/MockProductoService';
import { ProductoForm } from './ProductoForm';
import { ProductoList } from './ProductoListV2';

export const ProductoManager = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const productosData = await MockProductoService.getAllProductos();
      setProductos(productosData);
    } catch (err) {
      setError('Error al cargar los productos. Verifique la conexión a la base de datos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProducto = async (productoData: CreateProductoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newProducto = await MockProductoService.createProducto(productoData);
      setProductos(prev => [newProducto, ...prev]);
    } catch (err) {
      setError('Error al crear producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProducto = async (productoData: CreateProductoRequest) => {
    if (!editingProducto) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedProducto = await MockProductoService.updateProducto(editingProducto.id.toString(), productoData);
      setProductos(prev => 
        prev.map(producto => 
          producto.id === editingProducto.id ? updatedProducto : producto
        )
      );
      setEditingProducto(null);
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProducto = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await MockProductoService.deleteProducto(id.toString());
      setProductos(prev => prev.filter(producto => producto.id !== id));
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProducto = (producto: Producto) => {
    setEditingProducto(producto);
  };

  const handleCancelForm = () => {
    setEditingProducto(null);
  };

  const handleSubmitForm = (productoData: CreateProductoRequest) => {
    if (editingProducto) {
      handleUpdateProducto(productoData);
    } else {
      handleCreateProducto(productoData);
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h2>Gestión de Productos</h2>
        <div className="manager-stats">
          <span className="stat-badge">
            {productos.length} producto{productos.length !== 1 ? 's' : ''} registrado{productos.length !== 1 ? 's' : ''}
          </span>
          <button onClick={loadProductos} className="btn btn-refresh" disabled={loading}>
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
          <ProductoForm
            producto={editingProducto}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            loading={loading}
          />
        </div>
        
        <div className="list-section">
          <ProductoList
            productos={productos}
            onEdit={handleEditProducto}
            onDelete={handleDeleteProducto}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
