<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Bar } from '../types/Bar'
import AddBarForm from '../components/AddBarForm.vue'
import BarList from '../components/BarList.vue'

const bares = ref<Bar[]>([
  { 
    id: 1, 
    nombre: 'Bar Example', 
    ubicacion: 'Flavio Reyes', 
    horario: '10:00 - 22:00', 
    telefono: '123-456-7890', 
    imageUrl: 'https://via.placeholder.com/150',
    abierto: false
  },
  { 
    id: 2, 
    nombre: 'Bar Sample', 
    ubicacion: 'Av. Principal', 
    horario: '11:00 - 23:00', 
    telefono: '987-654-3210', 
    imageUrl: 'https://via.placeholder.com/150',
    abierto: false
  }
])

const nextId = ref(3)
const addBar = (barText: string, ubiText: string, horaText: string, telText: string, imgURL: string) => {
  const newBar: Bar = {
    id: nextId.value++,
    nombre: barText,
    ubicacion: ubiText,
    horario: horaText,
    telefono: telText,
    imageUrl: imgURL,
    abierto: false
  }
  bares.value.push(newBar)
}

const toggleAbierto = (barId: number) => {
  const bar = bares.value.find((b: Bar) => b.id === barId)
  if (bar) bar.abierto = !bar.abierto
}

const removeBar = (barId: number) => {
  const index = bares.value.findIndex((bar: Bar) => bar.id === barId)
  if (index !== -1) {
    bares.value.splice(index, 1)
  }
}

const baresAbiertosCount = computed(() => bares.value.filter(bar => bar.abierto).length)
</script>

<template>
  <div class="bares-app">
    <header class="header">
      <h1>🍻 Lista de Bares</h1>
      <p class="subtitle">Gestión simple de bares en Vue 3</p>
    </header>

    <main class="main-content">
      <AddBarForm @add-bar="addBar" />

      <div class="bar-counter">
        <p v-if="baresAbiertosCount === 0" class="no-abiertos">
          ⚠️ No hay bares abiertos
        </p>
        <p v-else class="abiertos-count">
          ✅ {{ baresAbiertosCount }} bar{{ baresAbiertosCount !== 1 ? 'es' : '' }} abierto{{ baresAbiertosCount !== 1 ? 's' : '' }}
        </p>
      </div>

      <BarList
        :bares="bares"
        @toggle-abierto="toggleAbierto"
        @remove-bar="removeBar"
      />

      <div v-if="bares.length === 0" class="empty-state">
        <p>No hay bares aún. ¡Agrega uno nuevo! 🍺</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.bares-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0;
}

.main-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.bar-counter {
  margin: 1.5rem 0;
  text-align: center;
}

.no-abiertos {
  color: #c0392b;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.abiertos-count {
  color: #27ae60;
  font-weight: 500;
  margin: 0;
}

.empty-state {
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  margin-top: 2rem;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
}
</style>
