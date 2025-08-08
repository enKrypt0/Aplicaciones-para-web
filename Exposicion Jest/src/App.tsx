import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import TodoList from './components/TodoList'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'counter' | 'todos'>('home')

  const renderView = () => {
    switch (currentView) {
      case 'counter':
        return <Counter initialValue={0} step={1} />
      case 'todos':
        return <TodoList />
      default:
        return (
          <div className="home-view">
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Exposición Jest + React</h1>
            <div className="card">
              <h2>🧪 Aplicación de Demostración para Testing</h2>
              <p>
                Esta aplicación demuestra diferentes tipos de testing con Jest:
              </p>
              <ul className="features-list">
                <li>✅ <strong>Testing de Componentes</strong> - Counter y TodoList</li>
                <li>✅ <strong>Testing de Funciones Puras</strong> - Utilidades matemáticas</li>
                <li>✅ <strong>Testing de Interacciones</strong> - Eventos de usuario</li>
                <li>✅ <strong>Testing de Estados</strong> - Cambios en React state</li>
              </ul>
              <p>
                Navega por los componentes para ver ejemplos prácticos de testing.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      <nav className="navigation">
        <button 
          onClick={() => setCurrentView('home')}
          className={currentView === 'home' ? 'active' : ''}
          data-testid="nav-home"
        >
          🏠 Inicio
        </button>
        <button 
          onClick={() => setCurrentView('counter')}
          className={currentView === 'counter' ? 'active' : ''}
          data-testid="nav-counter"
        >
          🔢 Contador
        </button>
        <button 
          onClick={() => setCurrentView('todos')}
          className={currentView === 'todos' ? 'active' : ''}
          data-testid="nav-todos"
        >
          📝 Tareas
        </button>
      </nav>
      
      <main className="main-content">
        {renderView()}
      </main>
      
      <footer className="footer">
        <p>📚 Material de exposición - Testing con Jest y React</p>
      </footer>
    </>
  )
}

export default App
