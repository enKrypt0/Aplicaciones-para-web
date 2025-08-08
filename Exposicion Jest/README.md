# 🧪 Exposición Jest - Aplicación React con Testing

**Material educativo para universidad sobre testing con Jest y React Testing Library**

Esta aplicación demuestra diferentes patrones y técnicas de testing en React, perfecta para exposiciones universitarias y aprendizaje de testing en JavaScript/TypeScript.

## 🚀 Características

- **React 19** con TypeScript para tipado estricto
- **Vite** como bundler y servidor de desarrollo
- **Jest** + **React Testing Library** para testing
- **Componentes interactivos** con tests completos
- **Funciones utilitarias** para demostrar testing de lógica pura
- **Navegación entre secciones** para facilitar la demostración

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React con tests
│   ├── Counter.tsx      # Componente contador con estado
│   ├── Counter.test.tsx # Tests del contador
│   ├── TodoList.tsx     # Lista de tareas CRUD
│   └── TodoList.test.tsx # Tests de la lista de tareas
├── utils/               # Utilidades y funciones puras
│   ├── utilidades.ts    # Funciones matemáticas y validadores
│   └── utilidades.test.ts # Tests de funciones puras
├── App.tsx              # Componente principal con navegación
└── setupTests.ts        # Configuración de testing
```

## 🎯 Tipos de Testing Implementados

### 1. **Testing de Componentes React**
- Renderizado de componentes
- Interacciones de usuario (click, input, etc.)
- Estados y props
- Navegación entre vistas

### 2. **Testing de Funciones Puras**
- Operaciones matemáticas
- Validaciones (email, contraseñas, fechas)
- Manipulación de strings y arrays
- Casos edge y manejo de errores

### 3. **Testing de Interacciones**
- Eventos de usuario con `@testing-library/user-event`
- Formularios y inputs
- Estado local de componentes
- Navegación y rutas

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build para producción
npm run preview         # Preview del build

# Testing
npm run test            # Ejecutar todos los tests
npm run test:watch      # Tests en modo watch
npm run test:coverage   # Tests con reporte de cobertura
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Ejecutar tests:**
   ```bash
   npm run test
   ```

## 🎓 Uso para Exposiciones

### Navegación en la Aplicación
La aplicación incluye tres secciones principales:

1. **🏠 Inicio** - Información general y conceptos de testing
2. **🔢 Contador** - Componente con estado para demostrar testing de interacciones
3. **📝 Tareas** - CRUD completo para testing avanzado

### Conceptos Demostrados

#### Testing de Componentes
- `render()` - Renderizar componentes para testing
- `screen.getByText()` - Encontrar elementos por texto
- `screen.getByTestId()` - Encontrar elementos por test ID
- `expect().toBeInTheDocument()` - Verificar presencia en DOM

#### Testing de Interacciones
- `userEvent.click()` - Simular clicks
- `userEvent.type()` - Simular escritura
- `userEvent.keyboard()` - Simular teclas especiales

#### Testing de Estado
- Verificar cambios de estado después de interacciones
- Testing de props y su efecto en el comportamiento
- Casos edge y validaciones

#### Testing de Funciones Puras
- Tests unitarios simples
- Casos de éxito y error
- Validaciones y transformaciones de datos

## 📚 Ejemplos de Código para Exposición

### Ejemplo 1: Test Básico
```typescript
test('renderiza el contador con valor inicial', () => {
  render(<Counter />);
  expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
});
```

### Ejemplo 2: Test de Interacción
```typescript
test('incrementa el valor al hacer click', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  
  await user.click(screen.getByTestId('increment-button'));
  
  expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
});
```

### Ejemplo 3: Test de Función Pura
```typescript
test('suma dos números correctamente', () => {
  expect(calculadora.sumar(2, 3)).toBe(5);
  expect(calculadora.sumar(-1, 1)).toBe(0);
});
```

## 🔧 Configuración

### Jest Configuration
El proyecto incluye configuración personalizada de Jest en `jest.config.js` para:
- Soporte de TypeScript y JSX
- Entorno jsdom para testing de componentes
- Mocking de archivos CSS
- Configuración de cobertura de código

### Testing Library Setup
- `@testing-library/react` - Testing de componentes
- `@testing-library/jest-dom` - Matchers adicionales
- `@testing-library/user-event` - Simulación de eventos de usuario

## 📋 Lista de Tests Implementados

### Componente Counter
- ✅ Renderizado inicial
- ✅ Incremento y decremento
- ✅ Función reset
- ✅ Props personalizadas (initialValue, step)
- ✅ Múltiples interacciones

### Componente TodoList
- ✅ Lista vacía inicial
- ✅ Agregar nuevas tareas
- ✅ Marcar como completadas
- ✅ Eliminar tareas
- ✅ Estadísticas de progreso
- ✅ Validaciones de entrada

### Utilidades
- ✅ Operaciones matemáticas
- ✅ Manipulación de strings
- ✅ Operaciones con arrays
- ✅ Validadores (email, contraseñas, fechas)
- ✅ Manejo de errores

## 🎯 Objetivos de Aprendizaje

Al finalizar la exposición, los estudiantes podrán:

1. **Entender la importancia** del testing en desarrollo web
2. **Escribir tests básicos** para componentes React
3. **Simular interacciones** de usuario en tests
4. **Testear funciones puras** y lógica de negocio
5. **Interpretar reportes** de cobertura de código
6. **Aplicar TDD** (Test-Driven Development) básico

## 👥 Contribución y Mejoras

Este proyecto está diseñado para ser educational y puede ser extendido con:

- Más componentes y casos de uso
- Testing de hooks personalizados
- Testing de APIs y llamadas asíncronas
- Testing de navegación y routing
- Ejemplos de mocking avanzado

---

**📝 Nota:** Este proyecto fue creado específicamente para fines educativos y demostración de conceptos de testing en React.
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
