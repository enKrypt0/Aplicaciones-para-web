<template>
  <div class="cliente-form">
    <h3>Información del Cliente</h3>
    
    <form @submit.prevent="$emit('submit', clienteData)">
      <div class="form-group">
        <label for="nombre">Nombre Completo *</label>
        <input 
          id="nombre"
          v-model="clienteData.nombre"
          type="text"
          required
          placeholder="Ingresa tu nombre completo"
        >
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico *</label>
        <input 
          id="email"
          v-model="clienteData.email"
          type="email"
          required
          placeholder="tu@correo.com"
        >
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono *</label>
        <input 
          id="telefono"
          v-model="clienteData.telefono"
          type="tel"
          required
          placeholder="+593 99 999 9999"
        >
      </div>

      <h4>Dirección de Envío</h4>

      <div class="form-group">
        <label for="calle">Dirección *</label>
        <input 
          id="calle"
          v-model="clienteData.IDireccion.calle"
          type="text"
          required
          placeholder="Calle, número, referencias"
        >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="ciudad">Ciudad *</label>
          <input 
            id="ciudad"
            v-model="clienteData.IDireccion.ciudad"
            type="text"
            required
            placeholder="Ciudad"
          >
        </div>

        <div class="form-group">
          <label for="codigoPostal">Código Postal *</label>
          <input 
            id="codigoPostal"
            v-model="clienteData.IDireccion.codigoPostal"
            type="text"
            required
            placeholder="000000"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="pais">País *</label>
        <select id="pais" v-model="clienteData.IDireccion.pais" required>
          <option value="">Selecciona un país</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Colombia">Colombia</option>
          <option value="Perú">Perú</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="México">México</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" @click="cargarDatosEjemplo" class="btn-secundario">
          Usar datos de ejemplo
        </button>
        <button type="submit" class="btn-primary" :disabled="!formularioValido">
          Continuar al Pago
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ICliente } from '../types/icliente'
import { DatabaseService } from '../types/database'

const emit = defineEmits<{
  submit: [cliente: ICliente]
}>()

const db = DatabaseService.getInstance()

const clienteData = ref<ICliente>({
  id: Date.now(), // ID temporal
  nombre: '',
  email: '',
  telefono: '',
  IDireccion: {
    calle: '',
    ciudad: '',
    codigoPostal: '',
    pais: ''
  }
})

const formularioValido = computed(() => {
  return clienteData.value.nombre.trim() !== '' &&
         clienteData.value.email.trim() !== '' &&
         clienteData.value.telefono.trim() !== '' &&
         clienteData.value.IDireccion.calle.trim() !== '' &&
         clienteData.value.IDireccion.ciudad.trim() !== '' &&
         clienteData.value.IDireccion.codigoPostal.trim() !== '' &&
         clienteData.value.IDireccion.pais.trim() !== ''
})

const cargarDatosEjemplo = () => {
  const clientesEjemplo = db.getClientes()
  if (clientesEjemplo.length > 0) {
    const cliente = clientesEjemplo[0]
    clienteData.value = {
      ...cliente,
      id: Date.now() // Nuevo ID para esta sesión
    }
  } else {
    // Datos de ejemplo por defecto
    clienteData.value = {
      id: Date.now(),
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '+593 99 123 4567',
      IDireccion: {
        calle: 'Av. 9 de Octubre 123, entre Malecón y Chile',
        ciudad: 'Guayaquil',
        codigoPostal: '090505',
        pais: 'Ecuador'
      }
    }
  }
}
</script>

<style scoped>
.cliente-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cliente-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.cliente-form h4 {
  margin: 20px 0 15px 0;
  color: #555;
  font-size: 16px;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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
  background: #007bff;
  color: white;
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
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
