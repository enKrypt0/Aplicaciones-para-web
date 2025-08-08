<template>
  <div class="confirmacion-compra">
    <div class="success-icon">
      <span>✅</span>
    </div>
    
    <h2>¡Compra Realizada con Éxito!</h2>
    
    <div class="numero-pedido">
      <h3>Número de Pedido: <strong>{{ compra.numeroPedido }}</strong></h3>
      <p class="fecha">Fecha: {{ formatearFecha(compra.fecha) }}</p>
    </div>

    <div class="detalles-compra">
      <div class="seccion">
        <h4>📦 Productos Comprados</h4>
        <div class="productos-lista">
          <div v-for="item in compra.items" :key="item.producto.id" class="producto-item">
            <img :src="item.producto.imagen" :alt="item.producto.nombre" class="producto-imagen">
            <div class="producto-info">
              <h5>{{ item.producto.nombre }}</h5>
              <p>Color: {{ item.producto.color }}</p>
              <p>Cantidad: {{ item.cantidadSeleccionada }}</p>
              <p class="precio">${{ item.subtotal.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="seccion">
        <h4>👤 Información del Cliente</h4>
        <div class="info-cliente">
          <p><strong>Nombre:</strong> {{ compra.cliente.nombre }}</p>
          <p><strong>Email:</strong> {{ compra.cliente.email }}</p>
          <p><strong>Teléfono:</strong> {{ compra.cliente.telefono }}</p>
        </div>
      </div>

      <div class="seccion">
        <h4>📍 Dirección de Envío</h4>
        <div class="info-direccion">
          <p>{{ compra.IDireccion.calle }}</p>
          <p>{{ compra.IDireccion.ciudad }}, {{ compra.IDireccion.codigoPostal }}</p>
          <p>{{ compra.IDireccion.pais }}</p>
        </div>
      </div>

      <div class="seccion">
        <h4>💳 Método de Pago</h4>
        <div class="info-pago">
          <p v-if="compra.pago.metodo === 'tarjeta'">
            <span class="metodo-icon">💳</span>
            Tarjeta terminada en {{ obtenerUltimosDigitos(compra.pago.numeroTarjeta) }}
          </p>
          <p v-else-if="compra.pago.metodo === 'paypal'">
            <span class="metodo-icon">📱</span>
            PayPal
          </p>
          <p v-else>
            <span class="metodo-icon">🏦</span>
            Transferencia Bancaria
          </p>
        </div>
      </div>

      <div class="seccion resumen-final">
        <h4>💰 Resumen de Pago</h4>
        <div class="totales">
          <div class="linea-total">
            <span>Subtotal:</span>
            <span>${{ compra.subtotal.toFixed(2) }}</span>
          </div>
          <div class="linea-total">
            <span>Impuestos:</span>
            <span>${{ compra.impuestos.toFixed(2) }}</span>
          </div>
          <div class="linea-total">
            <span>Envío:</span>
            <span>${{ compra.envio.toFixed(2) }}</span>
          </div>
          <div class="linea-total total-final">
            <span><strong>Total Pagado:</strong></span>
            <span><strong>${{ compra.total.toFixed(2) }}</strong></span>
          </div>
        </div>
      </div>

      <div class="seccion estado-pedido">
        <h4>📋 Estado del Pedido</h4>
        <div class="estado-timeline">
          <div class="estado-item activo">
            <span class="estado-icon">✅</span>
            <div class="estado-info">
              <h5>Pedido Confirmado</h5>
              <p>Tu pedido ha sido recibido y confirmado</p>
            </div>
          </div>
          <div class="estado-item">
            <span class="estado-icon">📦</span>
            <div class="estado-info">
              <h5>En Preparación</h5>
              <p>Estamos preparando tu pedido</p>
            </div>
          </div>
          <div class="estado-item">
            <span class="estado-icon">🚚</span>
            <div class="estado-info">
              <h5>En Camino</h5>
              <p>Tu pedido está en camino</p>
            </div>
          </div>
          <div class="estado-item">
            <span class="estado-icon">🏠</span>
            <div class="estado-info">
              <h5>Entregado</h5>
              <p>Pedido entregado exitosamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="acciones">
      <button @click="$emit('nuevaCompra')" class="btn-primary">
        Realizar Nueva Compra
      </button>
      <button @click="imprimirRecibo" class="btn-secundario">
        Imprimir Recibo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FinalizarCompra } from '../types/ifinalizarCompra'

defineProps<{
  compra: FinalizarCompra
}>()

defineEmits<{
  nuevaCompra: []
}>()

const formatearFecha = (fecha?: Date) => {
  if (!fecha) return new Date().toLocaleDateString('es-ES')
  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const obtenerUltimosDigitos = (numeroTarjeta?: string) => {
  if (!numeroTarjeta) return '****'
  return numeroTarjeta.replace(/\s/g, '').slice(-4)
}

const imprimirRecibo = () => {
  window.print()
}
</script>

<style scoped>
.confirmacion-compra {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.success-icon {
  text-align: center;
  margin-bottom: 20px;
}

.success-icon span {
  font-size: 64px;
  display: block;
}

.confirmacion-compra h2 {
  text-align: center;
  color: #28a745;
  margin-bottom: 30px;
}

.numero-pedido {
  text-align: center;
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.numero-pedido h3 {
  margin: 0;
  color: #155724;
}

.fecha {
  margin: 10px 0 0 0;
  color: #6c757d;
}

.detalles-compra {
  display: grid;
  gap: 20px;
}

.seccion {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.seccion h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.productos-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.producto-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.producto-imagen {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.producto-info {
  flex: 1;
}

.producto-info h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.producto-info p {
  margin: 2px 0;
  color: #666;
  font-size: 14px;
}

.precio {
  font-weight: bold;
  color: #007bff !important;
}

.info-cliente,
.info-direccion,
.info-pago {
  line-height: 1.6;
}

.info-cliente p,
.info-direccion p,
.info-pago p {
  margin: 8px 0;
  color: #333;
}

.metodo-icon {
  margin-right: 8px;
}

.resumen-final {
  background: #f8f9fa !important;
}

.totales {
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.linea-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #333;
}

.total-final {
  border-top: 2px solid #ddd;
  padding-top: 8px;
  margin-top: 8px;
  font-size: 18px;
}

.estado-pedido {
  background: #e3f2fd !important;
}

.estado-timeline {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.estado-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background: white;
}

.estado-item.activo {
  background: #e8f5e8;
}

.estado-icon {
  font-size: 24px;
  width: 40px;
  text-align: center;
}

.estado-info h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.estado-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.acciones {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.btn-primary,
.btn-secundario {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secundario {
  background: #6c757d;
  color: white;
}

.btn-secundario:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .confirmacion-compra {
    padding: 10px;
  }
  
  .producto-item {
    flex-direction: column;
    text-align: center;
  }
  
  .estado-timeline {
    gap: 10px;
  }
  
  .acciones {
    flex-direction: column;
  }
}

@media print {
  .acciones {
    display: none;
  }
}
</style>
