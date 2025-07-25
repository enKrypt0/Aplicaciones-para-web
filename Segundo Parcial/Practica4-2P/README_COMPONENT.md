# 🥤 AddBebidaForm Component - Sistema de Gestión de Bebidas

## 📋 Descripción

El componente `AddBebidaForm` es un sistema completo de gestión de inventario de bebidas desarrollado en **Angular 17+**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un catálogo de bebidas con funcionalidades avanzadas de control de stock.

## ✨ Características Principales

### 🔧 Funcionalidades CRUD
- ✅ **Crear**: Agregar nuevas bebidas al inventario
- ✅ **Leer**: Visualizar lista completa de bebidas
- ✅ **Actualizar**: Editar información de bebidas existentes
- ✅ **Eliminar**: Remover bebidas del inventario

### 📦 Gestión de Inventario
- 🔢 **Control de Stock**: Seguimiento de unidades disponibles
- ⚠️ **Alertas de Stock**: Identificación visual de productos agotados
- 💰 **Gestión de Precios**: Control de precios por unidad
- 📊 **Estadísticas**: Información sobre inventario total

### 🎨 Interfaz de Usuario
- 📱 **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla
- 🎯 **UX Intuitiva**: Interfaz amigable y fácil de usar
- 🌈 **Diseño Moderno**: Gradientes y sombras para mejor experiencia visual
- ⚡ **Feedback Visual**: Indicadores de estado y validaciones

## 🏗️ Estructura de Archivos

```
src/app/components/
├── AddBebidaForm.component.html    # Template del componente
├── AddBebidaForm.component.css     # Estilos del componente  
└── AddBebidaForm.ts               # Lógica del componente

src/app/services/
└── bebida.service.ts              # Servicio de gestión de datos

src/interfaces/
└── bebidas.ts                     # Interfaz TypeScript para bebidas
```

## 📊 Interfaz de Datos

```typescript
export interface Bebida {
    id: number;           // Identificador único
    nombre: string;       // Nombre de la bebida
    descripcion: string;  // Descripción detallada
    imagenUrl: string;    // URL de la imagen
    precio: number;       // Precio en USD
    stock: number;        // Unidades disponibles
}
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 17+ | Framework principal |
| **TypeScript** | 5.0+ | Lenguaje de programación |
| **RxJS** | 7.0+ | Manejo de observables |
| **HTML5** | - | Estructura del template |
| **CSS3** | - | Estilos y diseño |

## 🚀 Instalación y Configuración

### 1. Prerrequisitos
```bash
# Verificar versiones
node --version  # >= 18.0.0
npm --version   # >= 9.0.0
```

### 2. Instalación de dependencias
```bash
# Instalar dependencias del proyecto
npm install

# Instalar Angular CLI (si no está instalado)
npm install -g @angular/cli
```

### 3. Configuración del proyecto
```bash
# Clonar o copiar los archivos del componente
# Asegurarse de que estén en las rutas correctas:
# - src/app/components/
# - src/app/services/
# - src/interfaces/
```

## 🎮 Uso del Componente

### 1. Importar en el módulo principal
```typescript
// app.ts
import { AddBebidaFormComponent } from './components/AddBebidaForm';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, AddBebidaFormComponent],
  // ...
})
```

### 2. Usar en el template
```html
<!-- app.html -->
<app-add-bebida-form></app-add-bebida-form>
```

### 3. Ejecutar la aplicación
```bash
# Modo desarrollo
ng serve

# Modo desarrollo con puerto específico
ng serve --port 4200

# Modo producción
ng build --prod
```

## 🎯 Funcionalidades Detalladas

### ➕ Agregar Bebida
1. Completar todos los campos del formulario
2. Validación automática de datos
3. Guardar y limpiar formulario
4. Actualización automática de la lista

### ✏️ Editar Bebida
1. Hacer clic en "Editar" en cualquier tarjeta
2. El formulario se llena automáticamente
3. Modificar los datos necesarios
4. Guardar cambios o cancelar

### 📦 Gestión de Stock
1. Usar el botón "Stock" para ajustar inventario
2. Reabastecer productos agotados
3. Control visual de stock bajo
4. Estadísticas en tiempo real

### 🗑️ Eliminar Bebida
1. Hacer clic en "Eliminar"
2. Confirmar la acción
3. Eliminación inmediata de la lista

## 🎨 Personalización

### Colores principales
```css
/* Verde principal para bebidas */
--primary-color: #28a745;
--primary-hover: #218838;

/* Colores de estado */
--success-color: #28a745;
--warning-color: #ffc107;
--danger-color: #dc3545;
--info-color: #17a2b8;
```

### Modificar estilos
1. Editar `AddBebidaForm.component.css`
2. Personalizar variables CSS
3. Ajustar responsive breakpoints

## 📱 Responsive Design

| Breakpoint | Tamaño | Comportamiento |
|------------|--------|----------------|
| **Desktop** | >768px | Grid de 3-4 columnas |
| **Tablet** | 768px | Grid de 2 columnas |
| **Mobile** | <480px | Grid de 1 columna |

## 🔧 API del Servicio

### Métodos principales
```typescript
// Obtener todas las bebidas
obtenerBebidas(): Observable<Bebida[]>

// Agregar nueva bebida
agregarBebida(bebida: Omit<Bebida, 'id'>): Bebida

// Actualizar bebida existente
actualizarBebida(id: number, datos: Partial<Bebida>): Bebida | null

// Eliminar bebida
eliminarBebida(id: number): boolean

// Gestión de stock
actualizarStock(id: number, nuevoStock: number): Bebida | null

// Estadísticas
obtenerEstadisticas(): EstadisticasInventario
```

## 🚨 Validaciones

### Formulario
- ✅ Todos los campos son obligatorios
- ✅ Precio debe ser mayor a 0
- ✅ Stock debe ser mayor o igual a 0
- ✅ URL de imagen debe ser válida
- ✅ Nombre y descripción no pueden estar vacíos

### Datos de ejemplo
El servicio incluye 5 bebidas de ejemplo:
- Coca-Cola ($2.50, 50 unidades)
- Agua Mineral ($1.25, 100 unidades)
- Jugo de Naranja ($3.75, 25 unidades)
- Café Americano ($4.00, 0 unidades - agotado)
- Smoothie de Frutas ($6.50, 15 unidades)

## 🐛 Troubleshooting

### Errores comunes

**Error: Cannot find module**
```bash
# Verificar que todos los archivos estén en las rutas correctas
# Revisar imports en app.ts
```

**Error: Template parse errors**
```bash
# Verificar que FormsModule esté importado
# Revisar sintaxis del template HTML
```

**Estilos no se aplican**
```bash
# Verificar que el CSS esté en la ruta correcta
# Confirmar que styleUrls apunte al archivo correcto
```

## 🤝 Contribución

### Estructura del equipo
- **David Rafael Cevallos Conforme**
- **Jostin Manuel Delgado Cuadros**
- **Diego Andrés Velez Arana**

### Cómo contribuir
1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es desarrollado con fines educativos como parte del curso de **Aplicaciones para Web**.

---

**Curso:** Aplicaciones para Web  
**Período:** Segundo Parcial - Práctica 4  
**Framework:** Angular 17+  
**Fecha:** 2025

## 🎯 Objetivos de Aprendizaje Cumplidos

- ✅ Dominio de Angular y TypeScript
- ✅ Implementación de servicios y observables
- ✅ Manejo de formularios reactivos
- ✅ Diseño responsive y UX moderna
- ✅ Arquitectura de componentes escalable
- ✅ Gestión de estado local
- ✅ Validaciones y manejo de errores
