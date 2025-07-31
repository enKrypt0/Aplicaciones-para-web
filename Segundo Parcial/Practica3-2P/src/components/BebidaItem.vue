<script setup lang="ts">
import type { Bebida } from '../types/Bebidas';

defineProps<{
  bebida: Bebida;
}>();
</script>

<template>
  <div class="bebida-card">
    <img :src="bebida.imagenUrl" :alt="bebida.nombre" class="bebida-img" />
    <div class="bebida-header">
      <h3>{{ bebida.nombre }}</h3>
      <div class="bebida-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <p><strong>Descripción:</strong> {{ bebida.descripcion }}</p>
    <p><strong>Precio:</strong> ${{ bebida.precio }}</p>
    <p><strong>Stock:</strong> {{ bebida.stock }}</p>
  </div>
</template>

<style scoped>
.bebida-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  min-width: 220px;
  background: #fff;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bebida-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}
.bebida-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.bebida-actions button {
  margin-left: 8px;
}
</style>
