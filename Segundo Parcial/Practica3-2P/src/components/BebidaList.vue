
<script setup lang="ts">
import type { Bebida } from '../types/Bebidas';
import BebidaItem from './BebidaItem.vue';

defineProps<{
  bebidas: Bebida[];
  loading: boolean;
  onEdit: (bebida: Bebida) => void;
  onDelete: (id: number) => void;
}>();
</script>

<template>
  <div v-if="loading" class="loading">Cargando bebidas...</div>
  <div v-else-if="bebidas.length === 0" class="empty-state">No hay bebidas disponibles</div>
  <div v-else class="bebida-list">
    <h2>Lista de Bebidas</h2>
    <div class="bebidas-grid">
      <BebidaItem
        v-for="bebida in bebidas"
        :key="bebida.id"
        :bebida="bebida"
      >
        <template #actions>
          <button class="btn btn-edit" @click="$emit('edit', bebida)">Editar</button>
          <button class="btn btn-delete" @click="$emit('delete', bebida.id)">Eliminar</button>
        </template>
      </BebidaItem>
    </div>
  </div>
</template>

<style scoped>
.bebida-list { margin: 24px 0; }
.bebidas-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
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
