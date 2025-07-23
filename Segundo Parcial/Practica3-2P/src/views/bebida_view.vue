<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Bebida } from '../types/Bebida'
import AddBebidaForm from '../components/AddBebidaForm.vue'
import BebidaList    from '../components/BebidaList.vue'

/* Estado */
const bebidas = ref<Bebida[]>([])

const siguienteId = ref(1)

/* Computado: cuántas con stock > 0 */
const disponibles = computed(() =>
  bebidas.value.filter(b => b.stock > 0).length
)

/* CRUD */
type NuevaBebida = Omit<Bebida,'id'>

const addBebida = (data: NuevaBebida) => {
  bebidas.value.push({ id: siguienteId.value++, ...data })
}

const toggleStock = (id:number) => {
  const b = bebidas.value.find(x => x.id === id)
  if (b) b.stock = b.stock === 0 ? 5 : 0   /* simple demo: restaura a 5 */
}

const removeBebida = (id:number) => {
  bebidas.value = bebidas.value.filter(b => b.id !== id)
}
</script>

<template>
  <section class="bebidas-view">
    <header>
      <h1>🥤 Gestión de bebidas</h1>
      <p v-if="disponibles === 0">⚠️ Sin stock disponible</p>
      <p v-else>📦 {{ disponibles }} con stock</p>
    </header>

    <AddBebidaForm @add-bebida="addBebida" />

    <BebidaList
      :bebidas="bebidas"
      @toggle-stock="toggleStock"
      @remove-bebida="removeBebida"
    />
  </section>
</template>

<style scoped>
.bebidas-view{max-width:700px;margin:0 auto;padding:2rem;display:flex;flex-direction:column;gap:1.5rem}
header       {text-align:center}
</style>
