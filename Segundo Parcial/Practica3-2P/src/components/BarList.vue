<script setup lang="ts">
import type { Bar } from '../types/Bar'
import BarItem from './BarItem.vue'

/**
 * COMPONENTE DE PRESENTACIÓN ("TONTO")
 * 
 * Este componente es responsable ÚNICAMENTE de:
 * 1. Recibir la lista de bares vía props
 * 2. Renderizar un BarItem por cada bar usando v-for
 * 3. Propagar los eventos de BarItem hacia el componente padre
 */

interface Props {
  bars: Bar[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'remove-bar': [id: number]
}>()

const handleRemoveBar = (barId: number) => {
  emit('remove-bar', barId)
}
</script>

<template>
  <div class="bar-list">
    <h2>Lista de Bares</h2>
    
    <div v-if="props.bars.length > 0" class="bars-container">
      <BarItem
        v-for="bar in props.bars"
        :key="bar.id"
        :bar="bar"
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

.bars-container {
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