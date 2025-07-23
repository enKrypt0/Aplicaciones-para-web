<script setup lang="ts">
import type { usuario } from '../types/Usuario'

interface Props {
  usuario: usuario
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-disponible': [usuarioId: number]
  'remove-usuario': [usuarioId: number]
}>()

const handleToggleDisponible = () => {
  emit('toggle-disponible', props.usuario.id)
}

const handleRemove = () => {
  emit('remove-usuario', props.usuario.id)
}
</script>


<template>
  <div 
    class="usuario-item"
    :class="{ 'inactivo': !props.usuario.disponible }"
  >
    <div class="usuario-content">
      <input
        type="checkbox"
        :checked="props.usuario.disponible"
        @change="handleToggleDisponible"
        class="usuario-checkbox"
        :id="`usuario-${props.usuario.id}`"
        :aria-label="`Marcar usuario '${props.usuario.nombre}' como ${props.usuario.disponible ? 'inactivo' : 'activo'}`"
      />

      <label 
        :for="`usuario-${props.usuario.id}`"
        class="usuario-nombre"
        @click="handleToggleDisponible"
      >
        {{ props.usuario.nombre }}
      </label>
    </div>
    <div class="usuario-detalles">
      <p><strong>Dirección:</strong> {{ props.usuario.direccion }}</p>
      <p><strong>Teléfono:</strong> {{ props.usuario.telefono }}</p>
      <p><strong>Email:</strong> {{ props.usuario.email }}</p>
      <p><strong>Disponible:</strong> {{ props.usuario.disponible }}</p>
    </div>
    <button
      @click="handleRemove"
      class="remove-button"
      :aria-label="`Eliminar usuario '${props.usuario.nombre}'`"
      title="Eliminar usuario"
    >
      🗑️
    </button>
  </div>
</template>

<style scoped>
.usuario-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  position: relative;
}

.usuario-item:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.usuario-item.inactivo {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  opacity: 0.8;
}

.usuario-item.inactivo:hover {
  background-color: #f5c6cb;
}

.usuario-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  cursor: pointer;
}

.usuario-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.usuario-nombre {
  flex: 1;
  font-size: 1rem;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.usuario-item.inactivo .usuario-nombre {
  text-decoration: line-through;
  color: #6c757d;
  font-style: italic;
}

.usuario-detalles {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: #34495e;
  margin-left: 2rem;
}

.usuario-detalles p {
  margin: 0;
}

.remove-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.6;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.remove-button:hover {
  opacity: 1;
  background-color: #dc3545;
  transform: scale(1.1);
}

.remove-button:focus {
  outline: 2px solid #dc3545;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .usuario-item {
    padding: 0.75rem;
  }
  .usuario-nombre {
    font-size: 0.9rem;
  }
  .usuario-detalles {
    flex-direction: column;
    gap: 0.3rem;
    margin-left: 0;
  }
  .remove-button {
    font-size: 1rem;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>