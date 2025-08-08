<template>
  <div class="metodo-pago">
    <h3>Método de Pago</h3>
    
    <form @submit.prevent="$emit('submit', metodoPagoData)">
      <div class="metodos-disponibles">
        <div class="metodo-option">
          <input 
            id="tarjeta"
            v-model="metodoPagoData.metodo"
            type="radio"
            value="tarjeta"
            name="metodo"
          >
          <label for="tarjeta" class="metodo-label">
            <span class="metodo-icon">💳</span>
            Tarjeta de Crédito/Débito
          </label>
        </div>

        <div class="metodo-option">
          <input 
            id="paypal"
            v-model="metodoPagoData.metodo"
            type="radio"
            value="paypal"
            name="metodo"
          >
          <label for="paypal" class="metodo-label">
            <span class="metodo-icon">📱</span>
            PayPal
          </label>
        </div>

        <div class="metodo-option">
          <input 
            id="transferencia"
            v-model="metodoPagoData.metodo"
            type="radio"
            value="transferencia"
            name="metodo"
          >
          <label for="transferencia" class="metodo-label">
            <span class="metodo-icon">🏦</span>
            Transferencia Bancaria
          </label>
        </div>
      </div>

      <!-- Formulario para tarjeta -->
      <div v-if="metodoPagoData.metodo === 'tarjeta'" class="tarjeta-form">
        <div class="form-group">
          <label for="numeroTarjeta">Número de Tarjeta *</label>
          <input 
            id="numeroTarjeta"
            v-model="metodoPagoData.numeroTarjeta"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            @input="formatearNumeroTarjeta"
            required
          >
        </div>

        <div class="form-group">
          <label for="nombreTitular">Nombre del Titular *</label>
          <input 
            id="nombreTitular"
            v-model="metodoPagoData.nombreTitular"
            type="text"
            placeholder="Como aparece en la tarjeta"
            required
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="expiracion">Expiración *</label>
            <input 
              id="expiracion"
              v-model="metodoPagoData.expiracion"
              type="text"
              placeholder="MM/AA"
              maxlength="5"
              @input="formatearExpiracion"
              required
            >
          </div>

          <div class="form-group">
            <label for="cvv">CVV *</label>
            <input 
              id="cvv"
              v-model="metodoPagoData.cvv"
              type="text"
              placeholder="123"
              maxlength="4"
              required
            >
          </div>
        </div>
      </div>

      <!-- Información para PayPal -->
      <div v-else-if="metodoPagoData.metodo === 'paypal'" class="paypal-info">
        <div class="info-box">
          <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
        </div>
      </div>

      <!-- Información para transferencia -->
      <div v-else-if="metodoPagoData.metodo === 'transferencia'" class="transferencia-info">
        <div class="info-box">
          <h4>Datos para transferencia:</h4>
          <p><strong>Banco:</strong> Banco Pichincha</p>
          <p><strong>Cuenta:</strong> 1234567890</p>
          <p><strong>Titular:</strong> TiendaOnline S.A.</p>
          <p><strong>Referencia:</strong> Tu número de pedido</p>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="cargarDatosEjemplo" class="btn-secundario">
          Usar datos de ejemplo
        </button>
        <button type="submit" class="btn-primary" :disabled="!formularioValido">
          Finalizar Compra
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IMetodoPago } from '../types/imetodoPago'
//import { DatabaseService } from '../types/database'

defineEmits<{
  submit: [metodoPago: IMetodoPago]
}>()


const metodoPagoData = ref<IMetodoPago>({
  metodo: 'tarjeta',
  numeroTarjeta: '',
  nombreTitular: '',
  expiracion: '',
  cvv: ''
})

const formularioValido = computed(() => {
  if (metodoPagoData.value.metodo === 'tarjeta') {
    return metodoPagoData.value.numeroTarjeta !== '' &&
           metodoPagoData.value.nombreTitular !== '' &&
           metodoPagoData.value.expiracion !== '' &&
           metodoPagoData.value.cvv !== ''
  }
  return true // PayPal y transferencia no requieren datos adicionales
})

const formatearNumeroTarjeta = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\s/g, '').replace(/\D/g, '')
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  metodoPagoData.value.numeroTarjeta = value
}

const formatearExpiracion = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  metodoPagoData.value.expiracion = value
}

const cargarDatosEjemplo = () => {
  // Usar datos de ejemplo predefinidos
  metodoPagoData.value = {
    metodo: 'tarjeta',
    numeroTarjeta: '1234 5678 9012 3456',
    nombreTitular: 'Juan Pérez',
    expiracion: '12/25',
    cvv: '123'
  }
}
</script>

<style scoped>
.metodo-pago {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.metodo-pago h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.metodos-disponibles {
  margin-bottom: 20px;
}

.metodo-option {
  margin-bottom: 10px;
}

.metodo-option input[type="radio"] {
  margin-right: 10px;
}

.metodo-label {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.metodo-label:hover {
  background-color: #f8f9fa;
  border-color: #007bff;
}

.metodo-option input[type="radio"]:checked + .metodo-label {
  background-color: #e3f2fd;
  border-color: #007bff;
}

.metodo-icon {
  margin-right: 8px;
  font-size: 18px;
}

.tarjeta-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  margin: 15px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.info-box {
  background-color: #e3f2fd;
  padding: 15px;
  border-radius: 4px;
  margin: 15px 0;
}

.info-box h4 {
  margin-top: 0;
  color: #0277bd;
}

.info-box p {
  margin: 5px 0;
  color: #333;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
}

.btn-primary,
.btn-secundario {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #28a745;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #218838;
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
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
