"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Definición de Tipos Básicos
var nombreProducto = 'Whisky';
var stockDisponible = 25;
var precioProducto = 45.5;
var usuarioActivo = true;
var idLicoreria = 'LIC-001';
// 3. Definición de Clases
var UsuarioClass = /** @class */ (function () {
    function UsuarioClass(id, nombre, email, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.pedidos = [];
        this.telefono = telefono;
    }
    UsuarioClass.prototype.agregarPedido = function (pedido) {
        if (pedido.usuario.id !== this.id)
            throw new Error('El pedido no pertenece a este usuario');
        this.pedidos.push(pedido);
    };
    return UsuarioClass;
}());
var ProductoClass = /** @class */ (function () {
    function ProductoClass(id, nombre, descripcion, precio, categoria, disponible, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.disponible = disponible;
        this.stock = stock;
    }
    ProductoClass.prototype.validarStock = function (cantidad) {
        var _a;
        return ((_a = this.stock) !== null && _a !== void 0 ? _a : 0) >= cantidad;
    };
    return ProductoClass;
}());
var PedidoClass = /** @class */ (function () {
    function PedidoClass(id, usuario, productos, estado, direccionEntrega) {
        this.id = id;
        this.usuario = usuario;
        this.productos = productos;
        this.total = productos.reduce(function (acc, p) { return acc + p.precio; }, 0);
        this.estado = estado;
        this.fecha = new Date();
        this.direccionEntrega = direccionEntrega;
    }
    PedidoClass.prototype.validarPedido = function () {
        return this.productos.length > 0 && this.total > 0;
    };
    return PedidoClass;
}());
// 4. Creación de Arreglos Tipados
var usuarios = [
    new UsuarioClass(1, 'Carlos', 'carlos@mail.com', '099999999'),
    new UsuarioClass(2, 'Ana', 'ana@mail.com', '0912398129'),
    new UsuarioClass(3, 'Luis', 'luis@mail.com'),
    new UsuarioClass(4, 'Maria', 'maria@mail.com', '097349182'),
    new UsuarioClass(5, 'Pedro', 'pedro@mail.com'),
];
var productos = [
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
var pedidos = [
    new PedidoClass(1, usuarios[0], [productos[0], productos[2]], 'pendiente', 'Av. Principal 123'),
    new PedidoClass(2, usuarios[1], [productos[1], productos[3]], 'enviado', 'Calle Secundaria 456'),
    new PedidoClass(3, usuarios[2], [productos[4], productos[5]], 'entregado', 'Av. Central 789'),
    new PedidoClass(4, usuarios[3], [productos[6], productos[7]], 'cancelado', 'Calle 10 #100'),
    new PedidoClass(5, usuarios[4], [productos[8], productos[9]], 'pendiente', 'Av. 5 de Junio'),
];
// 5. Funciones Tipadas
function mostrarUsuarios(arr) {
    arr.forEach(function (u) { return console.log(u); });
}
function mostrarProductos(arr) {
    arr.forEach(function (p) { return console.log(p); });
}
function mostrarPedidos(arr) {
    arr.forEach(function (p) { return console.log(p); });
}
function filtrarProductosDisponibles(arr) {
    return arr.filter(function (p) { return p.disponible; });
}
function contarPedidosPorEstado(arr, estado) {
    return arr.filter(function (p) { return p.estado === estado; }).length;
}
function insertarUsuario(arr, usuario) {
    arr.push(usuario);
}
function eliminarUsuario(arr, id) {
    var idx = arr.findIndex(function (u) { return u.id === id; });
    if (idx !== -1)
        arr.splice(idx, 1);
}
// 6. Uso de tipos especiales ya aplicado en interfaces y funciones
// 7. Uso de map() para transformar datos
var nombresProductosMayus = productos.map(function (p) { return p.nombre.toUpperCase(); });
var resumenProductos = productos.map(function (p) { return ({ nombre: p.nombre, precio: p.precio }); });
var correosUsuarios = usuarios.map(function (u) { return u.email; });
// 8. Uso de filter() para seleccionar datos
var productosConStock = productos.filter(function (p) { var _a; return ((_a = p.stock) !== null && _a !== void 0 ? _a : 0) > 0; });
var usuariosConPedidos = usuarios.filter(function (u) { return u.pedidos.length > 0; });
var pedidosPendientes = pedidos.filter(function (p) { return p.estado === 'pendiente'; });
// 9. Uso de reduce() para cálculos acumulativos
var totalStock = productos.reduce(function (acc, p) { var _a; return acc + ((_a = p.stock) !== null && _a !== void 0 ? _a : 0); }, 0);
var totalVentas = pedidos.reduce(function (acc, p) { return acc + p.total; }, 0);
var promedioPrecio = productos.reduce(function (acc, p) { return acc + p.precio; }, 0) / productos.length;
// 10. Simular relaciones entre entidades como objetos conectados
var baseDatos = {
    usuarios: usuarios,
    productos: productos,
    pedidos: pedidos
};
// 11. Simular una operación de negocio simple entre entidades
function resumenPedido(pedido) {
    return "Pedido #".concat(pedido.id, " - Cliente: ").concat(pedido.usuario.nombre, " - Productos: ").concat(pedido.productos.map(function (p) { return p.nombre; }).join(', '), " - Total: $").concat(pedido.total);
}
function productosCompradosPorUsuario(usuario) {
    return usuario.pedidos.reduce(function (acc, p) { return acc + p.productos.length; }, 0);
}
// 12. Imprimir estructuras anidadas
function mostrarPedidosAnidados(arr) {
    arr.forEach(function (p) {
        console.log(resumenPedido(p));
        p.productos.forEach(function (prod) { return console.log('  -', prod.nombre, "$".concat(prod.precio)); });
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
