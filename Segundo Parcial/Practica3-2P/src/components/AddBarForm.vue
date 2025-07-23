<script setup lang="ts">
import { ref } from 'vue'

/**
 * COMPONENTE DE PRESENTACIÓN ("TONTO")
 * 
 * Este componente es responsable ÚNICAMENTE de:
 * 1. Renderizar el formulario para agregar un nuevo bar
 * 2. Manejar su propio estado local (campos del formulario)
 * 3. Emitir eventos cuando el usuario quiere agregar un bar
 * 
 * LO QUE NO HACE (y no debe hacer):
 * - No sabe qué hacer con el bar una vez creado
 * - No maneja la lista de bares
 * - No tiene lógica de negocio
 * - No sabe cómo se almacenan los bares
 */

// Estado local del componente: campos del formulario
const nombreBar = ref('')
const ubicacionBar = ref('')
const horarioBar = ref('')
const telefonoBar = ref('')
const imageUrlBar = ref('')

const emit = defineEmits<{
  'add-bar': [nombre: string, ubicacion: string, horario: string, telefono: string, imageUrl: string]
}>()

/**
 * Maneja el envío del formulario
 * Valida que los campos requeridos no estén vacíos y emite el evento
 */
const handleSubmit = () => {
  // Validación simple: campos requeridos no vacíos
  if (nombreBar.value.trim() === '' || 
      ubicacionBar.value.trim() === '' || 
      horarioBar.value.trim() === '') {
    return
  }
  
  emit('add-bar', 
    nombreBar.value.trim(),
    ubicacionBar.value.trim(),
    horarioBar.value.trim(),
    telefonoBar.value.trim(),
    imageUrlBar.value.trim()
  )
  
  // Limpiar el formulario después de emitir el evento
  nombreBar.value = ''
  ubicacionBar.value = ''
  horarioBar.value = ''
  telefonoBar.value = ''
  imageUrlBar.value = ''
}
</script>

<template>
  <div class="add-bar-form">
    <h2>Registrar Nuevo Bar</h2>
    
    <div class="form-container">
      <input
        v-model.trim="nombreBar"
        type="text"
        placeholder="Nombre del bar..."
        class="form-input"
        aria-label="Nombre del bar"
      />
      
      <input
        v-model.trim="ubicacionBar"
        type="text"
        placeholder="Ubicación..."
        class="form-input"
        aria-label="Ubicación del bar"
      />
      
      <input
        v-model.trim="horarioBar"
        type="text"
        placeholder="Horario (ej: 10:00 - 22:00)..."
        class="form-input"
        aria-label="Horario del bar"
      />
      
      <input
        v-model.trim="telefonoBar"
        type="tel"
        placeholder="Teléfono..."
        class="form-input"
        aria-label="Teléfono del bar"
      />
      
      <input
        v-model.trim="imageUrlBar"
        type="url"
        placeholder="URL de la imagen..."
        class="form-input"
        aria-label="URL de la imagen del bar"
      />
      
      <button
        @click="handleSubmit"
        :disabled="!nombreBar.trim() || !ubicacionBar.trim() || !horarioBar.trim()"
        class="add-button"
        type="button"
      >
        ➕ Registrar Bar
      </button>
    </div>
    
    <p class="hint">
      💡 Todos los campos marcados con * son obligatorios
    </p>
  </div>
</template>

<style scoped>
.add-bar-form {
  margin-bottom: 2rem;
}

.add-bar-form h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.form-input::placeholder {
  color: #bdc3c7;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.add-button:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-1px);
}

.add-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.hint {
  color: #7f8c8d;
  font-size: 0.85rem;
  margin: 0;
  font-style: italic;
}

/* Responsive design */
@media (max-width: 480px) {
  .form-container {
    gap: 0.5rem;
  }
  
  .add-button {
    width: 100%;
  }
}
</style>