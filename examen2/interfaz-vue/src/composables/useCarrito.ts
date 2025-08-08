import { ref, computed } from 'vue'
import type { Carrito } from '../types/icarrito'
import type { ICarritoItem } from '../types/icarritoItem'
import type { Producto } from '../types/iproductos'
import { DatabaseService } from '../types/database'

const carrito = ref<Carrito>({
  items: [],
  total: 0,
  cantidadTotal: 0
})

export const useCarrito = () => {
  const db = DatabaseService.getInstance()

  const agregarProducto = (producto: Producto, cantidad: number = 1) => {
    const itemExistente = carrito.value.items.find(item => item.producto.id === producto.id)
    
    if (itemExistente) {
      itemExistente.cantidadSeleccionada += cantidad
      itemExistente.subtotal = itemExistente.cantidadSeleccionada * producto.precio
    } else {
      const nuevoItem: ICarritoItem = {
        producto,
        cantidadSeleccionada: cantidad,
        subtotal: producto.precio * cantidad
      }
      carrito.value.items.push(nuevoItem)
    }
    
    actualizarTotales()
  }

  const eliminarProducto = (productoId: number) => {
    const index = carrito.value.items.findIndex(item => item.producto.id === productoId)
    if (index > -1) {
      carrito.value.items.splice(index, 1)
      actualizarTotales()
    }
  }

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    const item = carrito.value.items.find(item => item.producto.id === productoId)
    if (item) {
      if (nuevaCantidad <= 0) {
        eliminarProducto(productoId)
      } else {
        item.cantidadSeleccionada = nuevaCantidad
        item.subtotal = item.cantidadSeleccionada * item.producto.precio
        actualizarTotales()
      }
    }
  }

  const actualizarTotales = () => {
    carrito.value.total = carrito.value.items.reduce((total, item) => total + item.subtotal, 0)
    carrito.value.cantidadTotal = carrito.value.items.reduce((total, item) => total + item.cantidadSeleccionada, 0)
  }

  const limpiarCarrito = () => {
    carrito.value.items = []
    carrito.value.total = 0
    carrito.value.cantidadTotal = 0
  }

  const subtotal = computed(() => carrito.value.total)
  const configuracion = computed(() => db.getConfiguracion())
  const impuestos = computed(() => subtotal.value * configuracion.value.impuestos)
  const costoEnvio = computed(() => configuracion.value.costoEnvio)
  const totalFinal = computed(() => subtotal.value + impuestos.value + costoEnvio.value)

  // Inicializar con algunos productos de ejemplo
  const inicializarCarritoEjemplo = () => {
    const productos = db.getProductos()
    if (productos.length > 0 && carrito.value.items.length === 0) {
      agregarProducto(productos[0], 2)
      if (productos.length > 1) {
        agregarProducto(productos[1], 1)
      }
    }
  }

  return {
    carrito,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    limpiarCarrito,
    subtotal,
    impuestos,
    costoEnvio,
    totalFinal,
    inicializarCarritoEjemplo
  }
}
