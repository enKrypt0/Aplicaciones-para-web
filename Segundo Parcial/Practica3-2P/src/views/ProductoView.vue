<script setup lang="ts">
import { ref } from 'vue';
import ProductoList from '../components/ProductoList.vue';
import type { Producto } from '../types/Producto';

const productos = ref<Producto[]>([
  { id: 1, nombre: 'Cerveza', precio: 3, disponible: true },
  { id: 2, nombre: 'Ron', precio: 8, disponible: false },
]);
const loading = ref(false);

function handleEdit(producto: Producto) {
  // Lógica para editar producto
  alert('Editar producto: ' + producto.nombre);
}
function handleDelete(id: number) {
  // Lógica para eliminar producto
  alert('Eliminar producto con id: ' + id);
}
</script>

<template>
  <ProductoList :productos="productos" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
</template>
