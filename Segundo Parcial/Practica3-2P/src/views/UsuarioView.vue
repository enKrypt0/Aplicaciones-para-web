<script setup lang="ts">
import { ref } from 'vue';
import UsuarioList from '../components/UsuarioList.vue';
import type { Usuario } from '../types/Usuario';

const usuarios = ref<Usuario[]>([
  { id: 1, nombre: 'Juan', estado: true, direccion: 'Calle 1', telefono: '123456', email: 'juan@mail.com' },
  { id: 2, nombre: 'Ana', estado: false, direccion: 'Calle 2', telefono: '654321', email: 'ana@mail.com' },
]);
const loading = ref(false);

function handleEdit(usuario: Usuario) {
  // Lógica para editar usuario
  alert('Editar usuario: ' + usuario.nombre);
}
function handleDelete(id: number) {
  // Lógica para eliminar usuario
  alert('Eliminar usuario con id: ' + id);
}
</script>

<template>
  <UsuarioList :usuarios="usuarios" :loading="loading" @edit="handleEdit" @delete="handleDelete" />
</template>
