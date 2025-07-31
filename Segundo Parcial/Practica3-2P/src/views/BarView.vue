<script setup lang="ts">
import { ref } from 'vue';
import BarList from '../components/BarList.vue';
import type { Bar } from '../types/Bar';

const bars = ref<Bar[]>([
  { id: 1, nombre: 'Bar Central', ubicacion: 'Centro', stack: 'Cocteles', disponibilidad: true },
  { id: 2, nombre: 'Bar Norte', ubicacion: 'Norte', stack: 'Cervezas', disponibilidad: false },
]);
const loading = ref(false);

function handleEdit(bar: Bar) {
  // Lógica para editar bar
  alert('Editar bar: ' + bar.nombre);
}
function handleDelete(id: number) {
  // Lógica para eliminar bar
  alert('Eliminar bar con id: ' + id);
}
</script>

<template>
  <BarList :bars="bars" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
</template>
