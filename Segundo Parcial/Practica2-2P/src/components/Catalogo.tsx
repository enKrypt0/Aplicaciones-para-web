import { useEffect, useState } from 'react';
import type { Producto, CreateProductoRequest } from '../types/Producto';
import ProductoCard from './ProductoCard';
import { ProductoService } from '../services/ProductoService';

// Formulario especializado para cocteles
function ProductoForm({ onProductoCreado }: { onProductoCreado: () => void }) {
  const [form, setForm] = useState<CreateProductoRequest & { ingredientes: string; tipo: string; graduacion: number }>({
    nombre: '',
    precio: 0,
    disponible: true,
    ingredientes: '',
    tipo: '',
    graduacion: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (type === 'checkbox' && 'checked' in target) ? (target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'precio' || name === 'graduacion' ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Solo se envían los campos de CreateProductoRequest al backend
      await ProductoService.createProducto({
        nombre: form.nombre,
        precio: form.precio,
        disponible: form.disponible,
      });
      setForm({ nombre: '', precio: 0, disponible: true, ingredientes: '', tipo: '', graduacion: 0 });
      onProductoCreado();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del cóctel" required />
      <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio ($)" min={0} step={0.01} required />
      <input name="ingredientes" value={form.ingredientes} onChange={handleChange} placeholder="Ingredientes (separados por coma)" />
      <select name="tipo" value={form.tipo} onChange={handleChange} required>
        <option value="">Tipo de cóctel</option>
        <option value="clásico">Clásico</option>
        <option value="moderno">Moderno</option>
        <option value="sin alcohol">Sin alcohol</option>
      </select>
      <input name="graduacion" type="number" value={form.graduacion} onChange={handleChange} placeholder="Graduación alcohólica (%)" min={0} max={100} />
      <label>
        Disponible
        <input name="disponible" type="checkbox" checked={form.disponible} onChange={handleChange} />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Agregar Cóctel'}</button>
    </form>
  );
}

export default function ProductoList() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await ProductoService.getAllProductos();
      setProductos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h2>Cocteles</h2>
      <ProductoForm onProductoCreado={cargarProductos} />
      {loading ? <p>Cargando...</p> : (
        productos.length === 0 ? <p>No hay cocteles.</p> :
        productos.map((p) => (
          <div className="producto-card" key={p.id}>
            <ProductoCard producto={p} />
          </div>
        ))
      )}
    </div>
  );
}
