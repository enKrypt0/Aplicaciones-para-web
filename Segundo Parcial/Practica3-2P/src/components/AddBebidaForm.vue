<script setup lang="ts">
import { ref } from 'vue'
import type { Bebida } from '../types/Bebida'

/** Refs para cada campo */
const nombre       = ref('')
const descripcion  = ref('')
const imagenUrl    = ref('')
const precio       = ref<number | null>(null)
const stock        = ref<number | null>(null)

/** Tipamos el payload SIN el id (lo añadirá la vista) */
type NuevaBebida = Omit<Bebida, 'id'>

const emit = defineEmits<{
  'add-bebida': [data: NuevaBebida]
}>()

const limpiar = () => {
  nombre.value      = ''
  descripcion.value = ''
  imagenUrl.value   = ''
  precio.value      = null
  stock.value       = null
}

const datosCompletos = () =>
  nombre.value.trim() !== '' &&
  descripcion.value.trim() !== '' &&
  imagenUrl.value.trim() !== '' &&
  precio.value !== null &&
  stock.value  !== null

const handleSubmit = () => {
  if (!datosCompletos()) return

  emit('add-bebida', {
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    imagenUrl: imagenUrl.value.trim(),
    precio: precio.value!,
    stock : stock.value!
  })

  limpiar()
}
</script>

<template>
  <fieldset class="add-bebida-form">
    <legend>Agregar nueva bebida</legend>

    <div class="campo">
      <label>Nombre</label>
      <input v-model="nombre" placeholder="Ej: Coca‑Cola" />
    </div>

    <div class="campo">
      <label>Descripción</label>
      <input v-model="descripcion" placeholder="Ej: Bebida gaseosa" />
    </div>

    <div class="campo">
      <label>URL de imagen</label>
      <input v-model="imagenUrl" placeholder="https://..." />
    </div>

    <div class="flex">
      <div class="campo">
        <label>Precio (USD)</label>
        <input v-model.number="precio" type="number" min="0" step="0.01" />
      </div>

      <div class="campo">
        <label>Stock</label>
        <input v-model.number="stock" type="number" min="0" />
      </div>
    </div>

    <button
      class="boton"
      :disabled="!datosCompletos()"
      type="button"
      @click="handleSubmit"
    >
      ➕ Agregar
    </button>
  </fieldset>
</template>

<style scoped>
.add-bebida-form {border:1px solid #ddd;padding:1rem;border-radius:8px}
legend{font-weight:700;margin-bottom:.5rem}
.campo{display:flex;flex-direction:column;margin-bottom:.75rem}
.flex{display:flex;gap:.75rem}
input{padding:.5rem;border:1px solid #ccc;border-radius:4px}
.boton{padding:.6rem 1.2rem;background:#3498db;color:#fff;border:none;border-radius:6px;cursor:pointer}
.boton:disabled {background:#bbb;cursor:not-allowed}
</style>
