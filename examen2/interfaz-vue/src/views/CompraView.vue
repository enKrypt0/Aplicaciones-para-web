<template>
  <div class="compra-view">
    <header class="header">
      <h1>🛒 Tienda Online - Proceso de Compra</h1>
      <p>Completa tu compra siguiendo los pasos a continuación</p>
    </header>

    <main>
      <FinalizarCompraForm />
    </main>

    <footer class="footer">
      <p>&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import FinalizarCompraForm from '../components/FinalizarCompraForm.vue'
</script>

<style scoped>
.compra-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2.5rem;
}

.header p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

main {
  flex: 1;
  padding: 20px 0;
}

.footer {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 15px;
}

.footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
  
  main {
    padding: 10px 0;
  }
}
</style>
