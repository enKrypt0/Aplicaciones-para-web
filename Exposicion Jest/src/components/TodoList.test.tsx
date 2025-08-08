import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  // Test básico de renderizado
  test('renderiza la lista de tareas vacía', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });

  // Test de agregar tarea
  test('agrega una nueva tarea', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    await user.type(input, 'Nueva tarea de prueba');
    await user.click(addButton);
    
    expect(screen.getByText('Nueva tarea de prueba')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  // Test de agregar tarea con Enter
  test('agrega tarea presionando Enter', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    await user.type(input, 'Tarea con Enter{enter}');
    
    expect(screen.getByText('Tarea con Enter')).toBeInTheDocument();
  });

  // Test de no agregar tarea vacía
  test('no agrega tareas vacías o solo espacios', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Intentar agregar tarea vacía
    await user.click(addButton);
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    
    // Intentar agregar solo espacios
    await user.type(input, '   ');
    await user.click(addButton);
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });

  // Test de marcar tarea como completada
  test('marca y desmarca tarea como completada', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Tarea para completar{enter}');
    
    const todoItem = screen.getByText('Tarea para completar').closest('.todo-item');
    const checkbox = screen.getByRole('checkbox');
    
    // Marcar como completada
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass('completed');
    
    // Desmarcar
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(todoItem).not.toHaveClass('completed');
  });

  // Test de eliminar tarea
  test('elimina una tarea', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    await user.type(input, 'Tarea para eliminar{enter}');
    
    expect(screen.getByText('Tarea para eliminar')).toBeInTheDocument();
    
    const deleteButton = screen.getByText('Eliminar');
    await user.click(deleteButton);
    
    expect(screen.queryByText('Tarea para eliminar')).not.toBeInTheDocument();
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });

  // Test de estadísticas
  test('muestra las estadísticas correctas', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Agregar 3 tareas
    await user.type(input, 'Tarea 1{enter}');
    await user.type(input, 'Tarea 2{enter}');
    await user.type(input, 'Tarea 3{enter}');
    
    // Completar la primera tarea
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    const stats = screen.getByTestId('todo-stats');
    expect(stats).toHaveTextContent('Completadas: 1 de 3');
    
    // Completar otra tarea
    await user.click(checkboxes[1]);
    expect(stats).toHaveTextContent('Completadas: 2 de 3');
  });

  // Test de múltiples tareas
  test('maneja múltiples tareas correctamente', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const tasks = ['Comprar leche', 'Estudiar React', 'Hacer ejercicio'];
    
    // Agregar múltiples tareas
    for (const task of tasks) {
      await user.type(input, `${task}{enter}`);
    }
    
    // Verificar que todas las tareas están presentes
    tasks.forEach(task => {
      expect(screen.getByText(task)).toBeInTheDocument();
    });
    
    // Verificar que hay 3 elementos en la lista
    const todoList = screen.getByTestId('todo-list');
    expect(todoList.children).toHaveLength(3);
  });

  // Test de trimming de espacios
  test('elimina espacios al inicio y final de las tareas', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    await user.type(input, '  Tarea con espacios  {enter}');
    
    expect(screen.getByText('Tarea con espacios')).toBeInTheDocument();
    expect(screen.queryByText('  Tarea con espacios  ')).not.toBeInTheDocument();
  });
});
