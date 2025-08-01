//Modulo creado por Diego Velez
import type { Producto } from '../types/Producto';
export default function ProductoCard({ producto }: { producto: Producto }) {
 return (
 <div style={{ border: '1px solid gray', marginBottom: '8px', padding: '6px' }}>
 <strong>{producto.nombre}</strong> - ${producto.precio}
 <br />
 Estado: {producto.disponible ? 'Disponible' : 'Agotado'}
 </div>
 );
}