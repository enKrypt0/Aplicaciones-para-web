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
      imagen: "https://via.placeholder.com/300x300/3498db/ffffff?text=Camiseta+Básica",
      color: "Blanco",
      texto: "",
      peso: 0.2,
      cantidad: 50,
      precio: 15.99
    },
    {
      id: 2,
      nombre: "Sudadera Premium",
      imagen: "https://via.placeholder.com/300x300/2c3e50/ffffff?text=Sudadera+Premium",
      color: "Negro",
      texto: "",
      peso: 0.6,
      cantidad: 30,
      precio: 45.99
    },
    {
      id: 3,
      nombre: "Polo Deportivo",
      imagen: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=Polo+Deportivo",
      color: "Rojo",
      texto: "",
      peso: 0.3,
      cantidad: 25,
      precio: 22.50
    },
    {
      id: 4,
      nombre: "Hoodie Personalizable",
      imagen: "https://via.placeholder.com/300x300/27ae60/ffffff?text=Hoodie+Personalizable",
      color: "Verde",
      texto: "",
      peso: 0.7,
      cantidad: 15,
      precio: 55.00
    },
    {
      id: 5,
      nombre: "Tank Top",
      imagen: "https://via.placeholder.com/300x300/f39c12/ffffff?text=Tank+Top",
      color: "Amarillo",
      texto: "",
      peso: 0.15,
      cantidad: 40,
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
    impuestos: 0.12, // 12% IVA
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

  constructor() {
    this.loadFromLocalStorage();
    // Asegurar que el Map se inicialice correctamente
    if (!(this.data.carritos instanceof Map)) {
      this.data.carritos = new Map();
    }
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
    this.saveToLocalStorage();
  }

  updateProducto(id: number, producto: Partial<Producto>): boolean {
    const index = this.data.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.productos[index] = { ...this.data.productos[index], ...producto };
      this.saveToLocalStorage();
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
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
  }

  getComprasCliente(clienteId: number): FinalizarCompra[] {
    return this.data.comprasFinalizadas.filter(c => c.cliente.id === clienteId);
  }

  // Personalizaciones
  addPersonalizacion(personalizacion: PersonalizacionProducto): void {
    this.data.personalizaciones.push(personalizacion);
    this.saveToLocalStorage();
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
    try {
      // Convertir Map a Array para JSON
      const dataToSave = {
        ...this.data,
        carritos: Array.from(this.data.carritos.entries())
      };
      localStorage.setItem('ecommerce_db', JSON.stringify(dataToSave));
      console.log('Datos guardados en localStorage');
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('ecommerce_db');
      if (saved) {
        const parsedData = JSON.parse(saved);
        
        // Convertir Array de vuelta a Map
        if (parsedData.carritos && Array.isArray(parsedData.carritos)) {
          parsedData.carritos = new Map(parsedData.carritos);
        } else {
          parsedData.carritos = new Map();
        }
        
        this.data = { ...database, ...parsedData };
        console.log('Datos cargados desde localStorage');
      } else {
        console.log('No hay datos previos en localStorage, usando datos por defecto');
      }
    } catch (error) {
      console.error('Error al cargar desde localStorage:', error);
      this.data = database;
    }
  }

  // Método para limpiar el localStorage (útil para debugging)
  clearLocalStorage(): void {
    localStorage.removeItem('ecommerce_db');
    this.data = database;
    this.data.carritos = new Map();
    console.log('localStorage limpiado');
  }
}