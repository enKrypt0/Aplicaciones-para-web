<template>
  <div class="carrito-resumen">
    <h3>Resumen del Pedido</h3>
    
    <div v-if="carrito.items.length === 0" class="carrito-vacio">
      <p>Tu carrito está vacío</p>
    </div>
    
    <div v-else>
      <div class="items-carrito">
        <div v-for="item in carrito.items" :key="item.producto.id" class="item-carrito">
          <div class="item-info">
            <img :src="item.producto.imagen" :alt="item.producto.nombre" class="item-imagen">
            <div class="item-detalles">
              <h4>{{ item.producto.nombre }}</h4>
              <p class="item-color">Color: {{ item.producto.color }}</p>
              <p class="item-precio">${{ item.producto.precio.toFixed(2) }}</p>
            </div>
          </div>
          
          <div class="item-cantidad">
            <button @click="actualizarCantidad(item.producto.id, item.cantidadSeleccionada - 1)" 
                    class="btn-cantidad">-</button>
            <span class="cantidad">{{ item.cantidadSeleccionada }}</span>
            <button @click="actualizarCantidad(item.producto.id, item.cantidadSeleccionada + 1)" 
                    class="btn-cantidad">+</button>
          </div>
          
          <div class="item-subtotal">
            ${{ item.subtotal.toFixed(2) }}
          </div>
          
          <button @click="eliminarProducto(item.producto.id)" class="btn-eliminar">
            ×
          </button>
        </div>
      </div>
      
      <div class="totales">
        <div class="linea-total">
          <span>Subtotal:</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="linea-total">
          <span>Impuestos ({{ (configuracion.impuestos * 100).toFixed(0) }}%):</span>
          <span>${{ impuestos.toFixed(2) }}</span>
        </div>
        <div class="linea-total">
          <span>Envío:</span>
          <span>${{ costoEnvio.toFixed(2) }}</span>
        </div>
        <div class="linea-total total-final">
          <span><strong>Total:</strong></span>
          <span><strong>${{ totalFinal.toFixed(2) }}</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarrito } from '../composables/useCarrito'
import { DatabaseService } from '../types/database'

const { carrito, actualizarCantidad, eliminarProducto, subtotal, impuestos, costoEnvio, totalFinal } = useCarrito()
const db = DatabaseService.getInstance()
const configuracion = db.getConfiguracion()
</script>

<style scoped>
.carrito-resumen {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.carrito-resumen h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.carrito-vacio {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.items-carrito {
  margin-bottom: 20px;
}

.item-carrito {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  gap: 15px;
}

.item-info {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.item-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-detalles h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.item-color {
  margin: 4px 0;
  font-size: 12px;
  color: #666;
}

.item-precio {
  margin: 0;
  font-weight: bold;
  color: #007bff;
}

.item-cantidad {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cantidad {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background: rgb(0, 0, 0);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cantidad:hover {
  background: #f5f5f5;
}

.cantidad {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
}

.item-subtotal {
  font-weight: bold;
  color: #333;
  min-width: 70px;
  text-align: right;
}

.btn-eliminar {
  width: 20px;
  height: 20px;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.btn-eliminar:hover {
  background: #c82333;
}

.totales {
  border-top: 2px solid #eee;
  padding-top: 15px;
}

.linea-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #333;
}

.total-final {
  border-top: 1px solid #ddd;
  padding-top: 8px;
  margin-top: 8px;
  font-size: 18px;
}
</style>
