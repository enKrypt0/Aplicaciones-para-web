import type { Producto } from "./iproductos";
//import type { ICarritoItem } from "./icarritoItem";
import type { Carrito } from "./icarrito";
import type { ICliente } from "./icliente";
import type { IDireccion } from "./idireccion";
import type { IMetodoPago } from "./imetodoPago";
import type { FinalizarCompra } from "./ifinalizarCompra";
import type { PersonalizacionProducto } from "./ipersonalizar";

// Interface principal de la base de datos
export interface Database {
  // Catálogo de productos
  productos: Producto[];
  
  // Gestión de carritos por cliente
  carritos: Map<number, Carrito>;
  
  // Registro de clientes
  clientes: ICliente[];
  
  // Direcciones registradas
  direcciones: IDireccion[];
  
  // Métodos de pago guardados
  metodosPago: IMetodoPago[];
  
  // Historial de compras finalizadas
  comprasFinalizadas: FinalizarCompra[];
  
  // Personalizaciones guardadas
  personalizaciones: PersonalizacionProducto[];
  
  // Configuración del sistema
  configuracion: {
    impuestos: number;
    costoEnvio: number;
    moneda: string;
    idioma: string;
  };
}

// Implementación de datos iniciales/mock
export const database: Database = {
  productos: [
    {
      id: 1,
      nombre: "Camiseta Básica",
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      color: "Blanco",
      texto: "",
      peso: 0.2,
      cantidad: 50,
      precio: 15.99
    },
    {
      id: 2,
      nombre: "Sudadera Super",
      imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      color: "Negro",
      texto: "",
      peso: 0.6,
      cantidad: 30,
      precio: 45.99
    },
    {
      id: 3,
      nombre: "Polo Clásico",
      imagen: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      color: "Azul",
      texto: "",
      peso: 0.25,
      cantidad: 40,
      precio: 25.99
    },
    {
      id: 4,
      nombre: "Camiseta Deportiva",
      imagen: "https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?w=400&h=400&fit=crop",
      color: "Gris",
      texto: "",
      peso: 0.18,
      cantidad: 35,
      precio: 19.99
    },
    {
      id: 5,
      nombre: "Hoodie Comfort",
      imagen: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
      color: "Rojo",
      texto: "",
      peso: 0.7,
      cantidad: 20,
      precio: 55.99
    },
    {
      id: 6,
      nombre: "Tank Top Verano",
      imagen: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      color: "Verde",
      texto: "",
      peso: 0.15,
      cantidad: 0,
      precio: 12.99
    }
  ],

  carritos: new Map(),

  clientes: [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      telefono: "+1234567890",
      IDireccion: {
        calle: "Calle Principal 123",
        ciudad: "Ciudad",
        codigoPostal: "12345",
        pais: "Ecuador"
      }
    }
  ],

  direcciones: [
    {
      calle: "Calle Principal 123",
      ciudad: "Ciudad",
      codigoPostal: "12345",
      pais: "Ecuador"
    }
  ],

  metodosPago: [
    {
      metodo: "tarjeta",
      numeroTarjeta: "1234 1234 1234 1234",
      nombreTitular: "Juan Pérez",
      expiracion: "12/25",
      cvv: "123"
    }
  ],

  comprasFinalizadas: [],

  personalizaciones: [],

  configuracion: {
    impuestos: 0.12, // 12% IVA Ecuador
    costoEnvio: 5.00,
    moneda: "USD",
    idioma: "es"
  }
};

// Funciones de utilidad para la persistencia
export class DatabaseService {
  private static instance: DatabaseService;
  private data: Database = database;

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Productos
  getProductos(): Producto[] {
    return this.data.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.data.productos.find(p => p.id === id);
  }

  addProducto(producto: Producto): void {
    this.data.productos.push(producto);
  }

  updateProducto(id: number, producto: Partial<Producto>): boolean {
    const index = this.data.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.productos[index] = { ...this.data.productos[index], ...producto };
      return true;
    }
    return false;
  }

  // Clientes
  getClientes(): ICliente[] {
    return this.data.clientes;
  }

  getClienteById(id: number): ICliente | undefined {
    return this.data.clientes.find(c => c.id === id);
  }

  addCliente(cliente: ICliente): void {
    this.data.clientes.push(cliente);
  }

  // Carritos
  getCarrito(clienteId: number): Carrito | undefined {
    return this.data.carritos.get(clienteId);
  }

  setCarrito(clienteId: number, carrito: Carrito): void {
    this.data.carritos.set(clienteId, carrito);
  }

  // Compras
  addCompraFinalizada(compra: FinalizarCompra): void {
    this.data.comprasFinalizadas.push(compra);
  }

  getComprasCliente(clienteId: number): FinalizarCompra[] {
    return this.data.comprasFinalizadas.filter(c => c.cliente.id === clienteId);
  }

  // Personalizaciones
  addPersonalizacion(personalizacion: PersonalizacionProducto): void {
    this.data.personalizaciones.push(personalizacion);
  }

  getPersonalizaciones(): PersonalizacionProducto[] {
    return this.data.personalizaciones;
  }

  // Configuración
  getConfiguracion() {
    return this.data.configuracion;
  }

  // Persistencia (simulada)
  saveToLocalStorage(): void {
    localStorage.setItem('ecommerce_db', JSON.stringify(this.data));
  }

  loadFromLocalStorage(): void {
    const saved = localStorage.getItem('ecommerce_db');
    if (saved) {
      this.data = JSON.parse(saved);
    }
  }
}