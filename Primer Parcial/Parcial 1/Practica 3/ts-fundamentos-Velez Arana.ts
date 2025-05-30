export {};

// 1. Definición de Tipos Básicos
const nombreProducto: string = 'Whisky';
const stockDisponible: number = 25;
const precioProducto: number = 45.5;
const usuarioActivo: boolean = true;
const idLicoreria: string | number = 'LIC-001';

// 2. Creación de Interfaces
interface Usuario {
    readonly id: number;
    nombre: string;
    email: string;
    pedidos: Pedido[];
    telefono?: string; // optional
}

interface Producto {
    readonly id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    disponible: boolean;
    stock?: number; // optional
}

interface Pedido {
    readonly id: number;
    usuario: Usuario;
    productos: Producto[];
    total: number;
    estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
    fecha: Date;
    direccionEntrega: string;
}

// 3. Definición de Clases
class UsuarioClass implements Usuario {
    readonly id: number;
    nombre: string;
    email: string;
    pedidos: Pedido[];
    telefono?: string;
    constructor(id: number, nombre: string, email: string, telefono?: string) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.pedidos = [];
        this.telefono = telefono;
    }
    agregarPedido(pedido: Pedido) {
        if (pedido.usuario.id !== this.id) throw new Error('El pedido no pertenece a este usuario');
        this.pedidos.push(pedido);
    }
}

class ProductoClass implements Producto {
    readonly id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    disponible: boolean;
    stock?: number;
    constructor(id: number, nombre: string, descripcion: string, precio: number, categoria: string, disponible: boolean, stock?: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.disponible = disponible;
        this.stock = stock;
    }
    validarStock(cantidad: number): boolean {
        return (this.stock ?? 0) >= cantidad;
    }
}

class PedidoClass implements Pedido {
    readonly id: number;
    usuario: Usuario;
    productos: Producto[];
    total: number;
    estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
    fecha: Date;
    direccionEntrega: string;
    constructor(id: number, usuario: Usuario, productos: Producto[], estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado', direccionEntrega: string) {
        this.id = id;
        this.usuario = usuario;
        this.productos = productos;
        this.total = productos.reduce((acc, p) => acc + p.precio, 0);
        this.estado = estado;
        this.fecha = new Date();
        this.direccionEntrega = direccionEntrega;
    }
    validarPedido(): boolean {
        return this.productos.length > 0 && this.total > 0;
    }
}

// 4. Creación de Arreglos Tipados
const usuarios: Usuario[] = [
    new UsuarioClass(1, 'Carlos', 'carlos@mail.com', '099999999'),
    new UsuarioClass(2, 'Ana', 'ana@mail.com', '0912398129'),
    new UsuarioClass(3, 'Luis', 'luis@mail.com'),
    new UsuarioClass(4, 'Maria', 'maria@mail.com', '097349182'),
    new UsuarioClass(5, 'Pedro', 'pedro@mail.com'),
];

const productos: Producto[] = [
    new ProductoClass(1, 'Ron', 'Ron añejo', 10, 'Licor', true, 20),
    new ProductoClass(2, 'Vodka', 'Vodka premium', 12, 'Licor', true, 15),
    new ProductoClass(3, 'Jugo de Naranja', 'Jugo natural', 3, 'Bebida', true, 30),
    new ProductoClass(4, 'Cerveza', 'Cerveza artesanal', 5, 'Licor', true, 50),
    new ProductoClass(5, 'Tequila', 'Tequila reposado', 18, 'Licor', false, 0),
    new ProductoClass(6, 'Ginebra', 'Ginebra importada', 14, 'Licor', true, 10),
    new ProductoClass(7, 'Agua', 'Agua mineral', 2, 'Bebida', true, 100),
    new ProductoClass(8, 'Whisky', 'Whisky escocés', 25, 'Licor', true, 8),
    new ProductoClass(9, 'Vino', 'Vino tinto', 20, 'Licor', true, 12),
    new ProductoClass(10, 'Refresco', 'Refresco cola', 2.5, 'Bebida', true, 40)
];

const pedidos: Pedido[] = [
    new PedidoClass(1, usuarios[0], [productos[0], productos[2]], 'pendiente', 'Av. Principal 123'),
    new PedidoClass(2, usuarios[1], [productos[1], productos[3]], 'enviado', 'Calle Secundaria 456'),
    new PedidoClass(3, usuarios[2], [productos[4], productos[5]], 'entregado', 'Av. Central 789'),
    new PedidoClass(4, usuarios[3], [productos[6], productos[7]], 'cancelado', 'Calle 10 #100'),
    new PedidoClass(5, usuarios[4], [productos[8], productos[9]], 'pendiente', 'Av. 5 de Junio'),
];

// 5. Funciones Tipadas
function mostrarUsuarios(arr: Usuario[]): void {
    arr.forEach(u => console.log(u));
}
function mostrarProductos(arr: Producto[]): void {
    arr.forEach(p => console.log(p));
}
function mostrarPedidos(arr: Pedido[]): void {
    arr.forEach(p => console.log(p));
}

function filtrarProductosDisponibles(arr: Producto[]): Producto[] {
    return arr.filter(p => p.disponible);
}
function contarPedidosPorEstado(arr: Pedido[], estado: Pedido['estado']): number {
    return arr.filter(p => p.estado === estado).length;
}
function insertarUsuario(arr: Usuario[], usuario: Usuario): void {
    arr.push(usuario);
}
function eliminarUsuario(arr: Usuario[], id: number): void {
    const idx = arr.findIndex(u => u.id === id);
    if (idx !== -1) arr.splice(idx, 1);
}

// 6. Uso de tipos especiales ya aplicado en interfaces y funciones

// 7. Uso de map() para transformar datos
const nombresProductosMayus = productos.map(p => p.nombre.toUpperCase());
const resumenProductos = productos.map(p => ({ nombre: p.nombre, precio: p.precio }));
const correosUsuarios = usuarios.map(u => u.email);

// 8. Uso de filter() para seleccionar datos
const productosConStock = productos.filter(p => (p.stock ?? 0) > 0);
const usuariosConPedidos = usuarios.filter(u => u.pedidos.length > 0);
const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente');

// 9. Uso de reduce() para cálculos acumulativos
const totalStock = productos.reduce((acc, p) => acc + (p.stock ?? 0), 0);
const totalVentas = pedidos.reduce((acc, p) => acc + p.total, 0);
const promedioPrecio = productos.reduce((acc, p) => acc + p.precio, 0) / productos.length;

// 10. Simular relaciones entre entidades como objetos conectados
const baseDatos = {
    usuarios,
    productos,
    pedidos
};

// 11. Simular una operación de negocio simple entre entidades
function resumenPedido(pedido: Pedido): string {
    return `Pedido #${pedido.id} - Cliente: ${pedido.usuario.nombre} - Productos: ${pedido.productos.map(p => p.nombre).join(', ')} - Total: $${pedido.total}`;
}
function productosCompradosPorUsuario(usuario: Usuario): number {
    return usuario.pedidos.reduce((acc, p) => acc + p.productos.length, 0);
}

// 12. Imprimir estructuras anidadas
function mostrarPedidosAnidados(arr: Pedido[]): void {
    arr.forEach(p => {
        console.log(resumenPedido(p));
        p.productos.forEach(prod => console.log('  -', prod.nombre, `$${prod.precio}`));
    });
}

// Pruebas y demostraciones
console.log('--- Usuarios ---');
mostrarUsuarios(usuarios);
console.log('--- Productos ---');
mostrarProductos(productos);
console.log('--- Pedidos ---');
mostrarPedidos(pedidos);
console.log('--- Productos Disponibles ---');
console.log(filtrarProductosDisponibles(productos));
console.log('--- Cantidad de pedidos pendientes ---');
console.log(contarPedidosPorEstado(pedidos, 'pendiente'));
console.log('--- Nombres de productos en mayúsculas ---');
console.log(nombresProductosMayus);
console.log('--- Resumen de productos ---');
console.log(resumenProductos);
console.log('--- Correos de usuarios ---');
console.log(correosUsuarios);
console.log('--- Productos con stock ---');
console.log(productosConStock);
console.log('--- Usuarios con pedidos ---');
console.log(usuariosConPedidos);
console.log('--- Pedidos pendientes ---');
console.log(pedidosPendientes);
console.log('--- Total de stock ---');
console.log(totalStock);
console.log('--- Total de ventas ---');
console.log(totalVentas);
console.log('--- Promedio de precio de productos ---');
console.log(promedioPrecio);
console.log('--- Base de datos simulada ---');
console.log(baseDatos);
console.log('--- Resumen de un pedido ---');
console.log(resumenPedido(pedidos[0]));
console.log('--- Productos comprados por Carlos ---');
console.log(productosCompradosPorUsuario(usuarios[0]));
console.log('--- Pedidos anidados ---');
mostrarPedidosAnidados(pedidos);