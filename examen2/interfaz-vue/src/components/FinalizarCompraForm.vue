<template>
  <div class="finalizar-compra">
    <div class="progreso">
      <div class="paso" :class="{ activo: pasoActual >= 1, completado: pasoActual > 1 }">
        <span class="numero">1</span>
        <span class="texto">Carrito</span>
      </div>
      <div class="linea" :class="{ completada: pasoActual > 1 }"></div>
      <div class="paso" :class="{ activo: pasoActual >= 2, completado: pasoActual > 2 }">
        <span class="numero">2</span>
        <span class="texto">Información</span>
      </div>
      <div class="linea" :class="{ completada: pasoActual > 2 }"></div>
      <div class="paso" :class="{ activo: pasoActual >= 3, completado: pasoActual > 3 }">
        <span class="numero">3</span>
        <span class="texto">Pago</span>
      </div>
      <div class="linea" :class="{ completada: pasoActual > 3 }"></div>
      <div class="paso" :class="{ activo: pasoActual >= 4 }">
        <span class="numero">4</span>
        <span class="texto">Confirmación</span>
      </div>
    </div>

    <div class="contenido">
      <!-- Paso 1: Carrito -->
      <div v-if="pasoActual === 1" class="paso-content">
        <CarritoResumen />
        <div class="paso-acciones">
          <button @click="siguientePaso" class="btn-primary" :disabled="carrito.items.length === 0">
            Continuar
          </button>
        </div>
      </div>

      <!-- Paso 2: Información del Cliente -->
      <div v-else-if="pasoActual === 2" class="paso-content">
        <ClienteForm @submit="guardarCliente" />
        <div class="paso-acciones">
          <button @click="pasoAnterior" class="btn-secundario">
            Volver
          </button>
        </div>
      </div>

      <!-- Paso 3: Método de Pago -->
      <div v-else-if="pasoActual === 3" class="paso-content">
        <MetodoPagoForm @submit="procesarPago" />
        <div class="paso-acciones">
          <button @click="pasoAnterior" class="btn-secundario">
            Volver
          </button>
        </div>
      </div>

      <!-- Paso 4: Confirmación -->
      <div v-else-if="pasoActual === 4" class="paso-content">
        <ConfirmacionCompra 
          :compra="compraFinalizada!" 
          @nueva-compra="reiniciarProceso"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CarritoResumen from './CarritoResumen.vue'
import ClienteForm from './ClienteForm.vue'
import MetodoPagoForm from './MetodoPagoForm.vue'
import ConfirmacionCompra from './ConfirmacionCompra.vue'
import { useCarrito } from '../composables/useCarrito'
import type { ICliente } from '../types/icliente'
import type { IMetodoPago } from '../types/imetodoPago'
import type { FinalizarCompra } from '../types/ifinalizarCompra'
import { DatabaseService } from '../types/database'

const { carrito, subtotal, impuestos, costoEnvio, totalFinal, limpiarCarrito, inicializarCarritoEjemplo } = useCarrito()
const db = DatabaseService.getInstance()

const pasoActual = ref(1)
const clienteInfo = ref<ICliente | null>(null)
const metodoPagoInfo = ref<IMetodoPago | null>(null)
const compraFinalizada = ref<FinalizarCompra | null>(null)

// Inicializar carrito con productos de ejemplo si está vacío
inicializarCarritoEjemplo()

const siguientePaso = () => {
  if (pasoActual.value < 4) {
    pasoActual.value++
  }
}

const pasoAnterior = () => {
  if (pasoActual.value > 1) {
    pasoActual.value--
  }
}

const guardarCliente = (cliente: ICliente) => {
  clienteInfo.value = cliente
  siguientePaso()
}

const procesarPago = (metodoPago: IMetodoPago) => {
  metodoPagoInfo.value = metodoPago
  finalizarCompra()
}

const finalizarCompra = () => {
  if (!clienteInfo.value || !metodoPagoInfo.value) return

  const numeroPedido = `PED-${Date.now()}`
  
  const compra: FinalizarCompra = {
    items: [...carrito.value.items],
    subtotal: subtotal.value,
    impuestos: impuestos.value,
    envio: costoEnvio.value,
    total: totalFinal.value,
    cliente: clienteInfo.value,
    IDireccion: clienteInfo.value.IDireccion,
    pago: metodoPagoInfo.value,
    estado: 'pagado',
    numeroPedido,
    fecha: new Date()
  }

  // Guardar la compra en la base de datos
  db.addCompraFinalizada(compra)
  db.saveToLocalStorage()

  // Actualizar estado
  compraFinalizada.value = compra
  siguientePaso()
}

const reiniciarProceso = () => {
  pasoActual.value = 1
  clienteInfo.value = null
  metodoPagoInfo.value = null
  compraFinalizada.value = null
  limpiarCarrito()
  inicializarCarritoEjemplo()
}
</script>

<style scoped>
.finalizar-compra {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.progreso {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.paso {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.numero {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecef;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s;
}

.paso.activo .numero {
  background: #007bff;
  color: white;
}

.paso.completado .numero {
  background: #28a745;
  color: white;
}

.texto {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.paso.activo .texto,
.paso.completado .texto {
  color: #333;
}

.linea {
  width: 80px;
  height: 2px;
  background: #e9ecef;
  margin: 0 20px;
  transition: all 0.3s;
}

.linea.completada {
  background: #28a745;
}

.contenido {
  min-height: 400px;
}

.paso-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.paso-acciones {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  margin-left: auto;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secundario {
  background: #6c757d;
  color: white;
}

.btn-secundario:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .progreso {
    padding: 15px 10px;
  }
  
  .linea {
    width: 40px;
    margin: 0 10px;
  }
  
  .numero {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .texto {
    font-size: 10px;
  }
  
  .paso-acciones {
    flex-direction: column;
    gap: 10px;
  }
}
</style>