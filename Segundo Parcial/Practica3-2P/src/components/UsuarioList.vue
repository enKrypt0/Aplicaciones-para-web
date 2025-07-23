<script setup lang="ts">
import type { usuario } from '../types/Usuario'
import UsuarioItem from './UsuarioItem.vue'

interface Props {
  usuarios: usuario[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-disponible': [usuarioId: number]
  'remove-usuario': [usuarioId: number]
}>()

const handleToggleDisponible = (usuarioId: number) => {
  emit('toggle-disponible', usuarioId)
}

const handleRemoveUsuario = (usuarioId: number) => {
  emit('remove-usuario', usuarioId)
}
</script>

<template>
  <div class="usuario-list">
    <h2>Lista de Usuarios</h2>

    <div v-if="props.usuarios.length > 0" class="usuarios-container">

      <UsuarioItem
        v-for="usuario in props.usuarios"
        :key="usuario.id"
        :usuario="usuario"
        @toggle-disponible="handleToggleDisponible"
        @remove-usuario="handleRemoveUsuario"
      />
    </div>

    <div v-else class="empty-list">
      <p>No hay usuarios en la lista</p>
    </div>
  </div>
</template>

<style scoped>
.usuario-list {
  margin-top: 1.5rem;
}

.usuario-list h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.usuarios-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-list {
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  padding: 2rem 0;
}

.empty-list p {
  margin: 0;
  font-size: 1rem;
}
</style>
