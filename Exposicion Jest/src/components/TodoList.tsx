import React, { useState } from 'react';
import './TodoList.css';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      <h2>Lista de Tareas</h2>
      
      <div className="todo-input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe una nueva tarea..."
          data-testid="todo-input"
          className="todo-input"
        />
        <button 
          onClick={addTodo}
          data-testid="add-button"
          className="add-button"
        >
          Agregar
        </button>
      </div>

      <div className="todo-stats" data-testid="todo-stats">
        {totalCount > 0 && (
          <p>Completadas: {completedCount} de {totalCount}</p>
        )}
      </div>

      <ul className="todo-items" data-testid="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`todo-checkbox-${todo.id}`}
              className="todo-checkbox"
            />
            <span 
              className="todo-text"
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-button-${todo.id}`}
              className="delete-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message" data-testid="empty-message">
          No hay tareas. ¡Agrega una nueva!
        </p>
      )}
    </div>
  );
};

export default TodoList;
