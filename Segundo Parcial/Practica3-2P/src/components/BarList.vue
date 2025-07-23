<script setup lang="ts">
import type { Bar } from '../types/Bar'
import BarItem from './BarItem.vue'

interface Props {
  bares: Bar[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-abierto': [id: number]
  'remove-bar': [id: number]
}>()

const handleToggleAbierto = (barId: number) => {
  emit('toggle-abierto', barId)
}

const handleRemoveBar = (barId: number) => {
  emit('remove-bar', barId)
}
</script>

<template>
  <div class="bar-list">
    <h2>Lista de Bares</h2>
    
    <div v-if="props.bares.length > 0" class="bares-container">
      <BarItem
        v-for="bar in props.bares"
        :key="bar.id"
        :bar="bar"
        @toggle-abierto="handleToggleAbierto"
        @remove-bar="handleRemoveBar"
      />
    </div>
    
    <div v-else class="empty-list">
      <p>No hay bares registrados</p>
    </div>
  </div>
</template>

<style scoped>
.bar-list {
  margin-top: 1.5rem;
}

.bar-list h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.bares-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
