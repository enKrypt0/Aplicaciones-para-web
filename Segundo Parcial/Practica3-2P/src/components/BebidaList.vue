<script setup lang="ts">
import type { Bebida } from '../types/Bebida'
import BebidaItem from './BebidaItem.vue'

interface Props { bebidas: Bebida[] }
const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-stock': [id: number]
  'remove-bebida': [id: number]
}>()

const alternar = (id:number)=>emit('toggle-stock',id)
const eliminar = (id:number)=>emit('remove-bebida',id)
</script>

<template>
  <section class="bebida-list">
    <h2>Lista de bebidas ({{ props.bebidas.length }})</h2>

    <div v-if="props.bebidas.length">
      <BebidaItem
        v-for="b in props.bebidas"
        :key="b.id"
        :bebida="b"
        @toggle-stock="alternar"
        @remove-bebida="eliminar"
      />
    </div>

    <p v-else>No hay bebidas registradas.</p>
  </section>
</template>

<style scoped>
.bebida-list{display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem}
</style>
