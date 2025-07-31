<script setup lang="ts">
import type { Producto } from '../types/Producto';

defineProps<{
  productos: Producto[];
  loading: boolean;
  onEdit: (producto: Producto) => void;
  onDelete: (id: number) => void;
}>();
</script>

<template>
  <div v-if="loading" class="loading">Cargando productos...</div>
  <div v-else-if="productos.length === 0" class="empty-state">No hay productos disponibles</div>
  <div v-else class="producto-list">
    <h2>Lista de Productos</h2>
    <div class="productos-grid">
      <div v-for="producto in productos" :key="producto.id" class="producto-card">
        <div class="producto-header">
          <h3>{{ producto.nombre }}</h3>
          <div class="producto-actions">
            <button class="btn btn-edit" @click="$emit('edit', producto)">Editar</button>
            <button class="btn btn-delete" @click="$emit('delete', producto.id)">Eliminar</button>
          </div>
        </div>
        <p><strong>Precio:</strong> ${{ producto.precio }}</p>
        <p><strong>Disponible:</strong> {{ producto.disponible ? 'Sí' : 'No' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.producto-list { margin: 24px 0; }
.productos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.producto-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  min-width: 220px;
  background: #fff;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.producto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.producto-actions button {
  margin-left: 8px;
}
</style>
