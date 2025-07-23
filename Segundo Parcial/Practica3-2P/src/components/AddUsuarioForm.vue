<script setup lang="ts">
import { ref } from 'vue'

const nombre = ref('')
const direccion = ref('')
const telefono = ref('')
const email = ref('')
const disponible = ref(true)

const emit = defineEmits<{
  (e: 'add-usuario', usuario: {
    nombre: string,
    direccion: string,
    telefono: string,
    email: string,
    disponible: boolean
  }): void
}>()

const submit = () => {
  if (!nombre.value) return
  emit('add-usuario', {
    nombre: nombre.value,
    direccion: direccion.value,
    telefono: telefono.value,
    email: email.value,
    disponible: disponible.value
  })
  nombre.value = ''
  direccion.value = ''
  telefono.value = ''
  email.value = ''
  disponible.value = true
}

</script>

<template>
  <div class="add-usuario-form">
    <h2>Registrar Nuevo Usuario</h2>
    <div class="form-container">
      <input v-model="nombre" type="text" placeholder="Nombre..." class="usuario-input" required />
      <input v-model="direccion" type="text" placeholder="Dirección..." class="usuario-input" required />
      <input v-model="telefono" type="text" placeholder="Teléfono..." class="usuario-input" required />
      <input v-model="email" type="email" placeholder="Email..." class="usuario-input" required />
      <div class="checkbox-row">
        <input id="disponible" v-model="disponible" type="checkbox" class="usuario-checkbox" />
        <label for="disponible">Disponible</label>
      </div>
      <button @click="submit" class="add-button" type="button"
        :disabled="!nombre || !direccion || !telefono || !email">
        ➕ Registrar Usuario
      </button>
    </div>
    <p class="hint">
      💡 Todos los campos son obligatorios
    </p>
  </div>
</template>

<style scoped>
.add-usuario-form {
  margin-bottom: 2rem;
}

.add-usuario-form h2 {
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

.usuario-input {
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.usuario-input:focus {
  outline: none;
  border-color: #3498db;
}

.usuario-input::placeholder {
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
  white-space: nowrap;
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

@media (max-width: 480px) {
  .form-container {
    flex-direction: column;
  }
  
  .add-button {
    width: 100%;
  }
}
.checkbox-row {
  color : #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.usuario-checkbox {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #3498db;
}
</style>
