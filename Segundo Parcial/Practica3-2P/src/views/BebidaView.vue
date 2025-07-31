<script setup lang="ts">
import { ref } from 'vue';
import BebidaList from '../components/BebidaList.vue';
import type { Bebida } from '../types/Bebidas';

const bebidas = ref<Bebida[]>([
  { id: 1, nombre: 'Mojito', descripcion: 'Cóctel cubano refrescante', imagenUrl: 'https://www.recetasderechupete.com/wp-content/uploads/2016/07/mojito-cubano.jpg', precio: 6, stock: 10 },
  { id: 2, nombre: 'Piña Colada', descripcion: 'Cóctel tropical de piña y coco', imagenUrl: 'https://www.gastrolabweb.com/u/fotografias/m/2023/3/10/f768x1-28213_28340_15.jpg', precio: 7, stock: 5 },
]);
const loading = ref(false);

function handleEdit(bebida: Bebida) {
  // Lógica para editar bebida
  alert('Editar bebida: ' + bebida.nombre);
}
function handleDelete(id: number) {
  // Lógica para eliminar bebida
  alert('Eliminar bebida con id: ' + id);
}
</script>

<template>
  <BebidaList :bebidas="bebidas" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
</template>
