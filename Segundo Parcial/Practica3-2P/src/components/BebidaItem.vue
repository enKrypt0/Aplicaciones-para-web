<script setup lang="ts">
import type { Bebida } from '../types/Bebida'

interface Props {
  bebida: Bebida
}
const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-stock': [bebidaId: number]
  'remove-bebida': [bebidaId: number]
}>()

const handleToggleStock = () => emit('toggle-stock', props.bebida.id)
const handleRemove = () => emit('remove-bebida', props.bebida.id)
</script>

<template>
  <div class="bebida-item" :class="{ 'agotado': props.bebida.stock === 0 }">
    <div class="bebida-content">
      <input
        type="checkbox"
        :checked="props.bebida.stock > 0"
        @change="handleToggleStock"
        class="bebida-checkbox"
        :id="`bebida-${props.bebida.id}`"
      />
      <label :for="`bebida-${props.bebida.id}`">
        {{ props.bebida.nombre }} – ${{ props.bebida.precio.toFixed(2) }}
      </label>
    </div>
    <button @click="handleRemove" class="remove-button">🗑️</button>
  </div>
</template>

<style scoped>
.bebida-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.bebida-item.agotado {
  background-color: #f8d7da;
}
.remove-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
