<script setup lang="ts">
import { ref, computed } from 'vue'
import type { usuario } from '../types/Usuario'
import AddUsuarioForm from '../components/AddUsuarioForm.vue'
import UsuarioList from '../components/UsuarioList.vue'

const usuarios = ref<usuario[]>([
  { id: 1, nombre: 'Juan Pérez', direccion: 'Calle A 123', telefono: '0999999999', email: 'juan@example.com', disponible: true },
  { id: 2, nombre: 'Ana Gómez', direccion: 'Calle B 456', telefono: '0988888888', email: 'ana@example.com', disponible: false },
  { id: 3, nombre: 'Luis Torres', direccion: 'Calle C 789', telefono: '0977777777', email: 'luis@example.com', disponible: true }
])

const nextId = ref(4)

const usuariosActivosCount = computed(() => {
  return usuarios.value.filter(usuario => usuario.disponible).length
})

const addUsuario = (nuevo: {
  nombre: string,
  direccion: string,
  telefono: string,
  email: string,
  disponible: boolean
}) => {
  const nuevoUsuario: usuario = {
    id: nextId.value++,
    nombre: nuevo.nombre,
    direccion: nuevo.direccion,
    telefono: nuevo.telefono,
    email: nuevo.email,
    disponible:!!nuevo.disponible
  }
  usuarios.value.push(nuevoUsuario)
}

const toggleEstado = (usuarioId: number) => {
  const user = usuarios.value.find(u => u.id === usuarioId)
  if (user) {
    user.disponible = !user.disponible
  }
}

const removeUsuario = (usuarioId: number) => {
  const index = usuarios.value.findIndex(u => u.id === usuarioId)
  if (index !== -1) {
    usuarios.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="usuario-app">
    <header class="header">
      <h1>👤 Lista de Usuarios</h1>
      <p class="subtitle">Gestión simple de usuarios en Vue 3</p>
    </header>

    <main class="main-content">
      <AddUsuarioForm @add-usuario="addUsuario" />

      <div class="usuario-counter">
        <p v-if="usuariosActivosCount === 0" class="no-activos">
          ⚠️ No hay usuarios activos
        </p>
        <p v-else class="activos-count">
          ✅ {{ usuariosActivosCount }} usuario{{ usuariosActivosCount !== 1 ? 's' : '' }} activo{{ usuariosActivosCount !== 1 ? 's' : '' }}
        </p>
      </div>

      <UsuarioList
        :usuarios="usuarios"
        @toggle-estado="toggleEstado"
        @remove-usuario="removeUsuario"
      />

      <div v-if="usuarios.length === 0" class="empty-state">
        <p>No hay usuarios aún. ¡Agrega uno nuevo! 🚀</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.usuario-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0;
}

.main-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.usuario-counter {
  margin: 1.5rem 0;
  text-align: center;
}

.no-activos {
  color: #c0392b;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
}

.activos-count {
  color: #27ae60;
  font-weight: 500;
  margin: 0;
}

.empty-state {
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  margin-top: 2rem;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
}
</style>
