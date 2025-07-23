<script setup lang="ts">
import { ref } from 'vue'
import UsuariosView from './views/usuario_view.vue'
import BaresView from './views/bar_view.vue'
import BebidasView from './views/bebida_view.vue'

const vistaActiva = ref<'usuarios' | 'bares' | 'bebidas'>('usuarios')
</script>

<template>
  <div>
    <nav class="nav">
      <button @click="vistaActiva = 'usuarios'">👤 Usuarios</button>
      <button @click="vistaActiva = 'bares'">🍻 Bares</button>
      <button @click="vistaActiva = 'bebidas'">🥤 Bebidas</button>
    </nav>

    <UsuariosView v-if="vistaActiva === 'usuarios'" />
    <BaresView v-if="vistaActiva === 'bares'" />
    <BebidasView v-if="vistaActiva === 'bebidas'" />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  font-weight: bold;
}
</style>
