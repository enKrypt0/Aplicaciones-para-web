import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renderiza la aplicación con navegación y vista inicial', () => {
    render(<App />);
    
    // Verificar navegación
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('nav-counter')).toBeInTheDocument();
    expect(screen.getByTestId('nav-todos')).toBeInTheDocument();
    
    // Verificar contenido inicial
    expect(screen.getByText('Exposición Jest + React')).toBeInTheDocument();
    expect(screen.getByText('🧪 Aplicación de Demostración para Testing')).toBeInTheDocument();
  });

  test('navega al componente Counter', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const counterButton = screen.getByTestId('nav-counter');
    await user.click(counterButton);
    
    expect(screen.getByText('Contador')).toBeInTheDocument();
    expect(screen.getByTestId('counter-value')).toBeInTheDocument();
  });

  test('navega al componente TodoList', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const todosButton = screen.getByTestId('nav-todos');
    await user.click(todosButton);
    
    expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
  });

  test('regresa a la vista inicial', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Ir a counter
    await user.click(screen.getByTestId('nav-counter'));
    expect(screen.getByText('Contador')).toBeInTheDocument();
    
    // Regresar a inicio
    await user.click(screen.getByTestId('nav-home'));
    expect(screen.getByText('Exposición Jest + React')).toBeInTheDocument();
  });

  test('muestra botón activo correctamente', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const homeButton = screen.getByTestId('nav-home');
    const counterButton = screen.getByTestId('nav-counter');
    
    // Inicialmente home debe estar activo
    expect(homeButton).toHaveClass('active');
    expect(counterButton).not.toHaveClass('active');
    
    // Cambiar a counter
    await user.click(counterButton);
    expect(homeButton).not.toHaveClass('active');
    expect(counterButton).toHaveClass('active');
  });

  test('renderiza el footer correctamente', () => {
    render(<App />);
    
    expect(screen.getByText('📚 Material de exposición - Testing con Jest y React')).toBeInTheDocument();
  });
});
