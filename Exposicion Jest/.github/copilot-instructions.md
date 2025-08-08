<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones del Proyecto - Exposición Jest

Este es un proyecto educativo de demostración para enseñar conceptos de testing con Jest y React Testing Library.

## Contexto del Proyecto

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **Propósito**: Material de exposición universitaria sobre testing

## Componentes Principales

1. **Counter**: Componente de contador con incremento, decremento y reset
2. **TodoList**: Lista de tareas con funcionalidades CRUD
3. **Utilidades**: Funciones puras para demostrar testing de lógica de negocio

## Patrones de Testing Implementados

- Testing de componentes React
- Testing de interacciones de usuario
- Testing de estados y props
- Testing de funciones puras
- Testing de validaciones
- Testing de navegación

## Convenciones de Código

- Usar TypeScript para tipado estricto
- Incluir data-testid en elementos para testing
- Mantener componentes simples y testeables
- Separar lógica de negocio en utilidades
- Usar descriptive test names en español para la audiencia

## Estructura de Tests

- Agrupar tests relacionados con `describe`
- Usar nombres descriptivos para casos de prueba
- Incluir tests para casos edge
- Verificar tanto el happy path como error cases
- Mantener tests independientes y reutilizables
