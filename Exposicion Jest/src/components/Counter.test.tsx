import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
  // Test básico de renderizado
  test('renderiza el contador con valor inicial por defecto', () => {
    render(<Counter />);
    
    expect(screen.getByText('Contador')).toBeInTheDocument();
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  // Test con props personalizadas
  test('renderiza con valor inicial personalizado', () => {
    render(<Counter initialValue={10} />);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');
  });

  // Test de incremento
  test('incrementa el valor cuando se hace clic en el botón +', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementButton = screen.getByTestId('increment-button');
    await user.click(incrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  // Test de decremento
  test('decrementa el valor cuando se hace clic en el botón -', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    await user.click(decrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('4');
  });

  // Test de reset
  test('resetea el valor al inicial cuando se hace clic en Reset', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    
    // Incrementar varias veces
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('3');
    
    // Resetear
    await user.click(resetButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  // Test con step personalizado
  test('usa el step personalizado para incrementar/decrementar', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={5} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    
    await user.click(incrementButton);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
    
    await user.click(decrementButton);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  // Test de múltiples clics
  test('maneja múltiples clics correctamente', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const incrementButton = screen.getByTestId('increment-button');
    
    // Hacer 5 clics
    for (let i = 0; i < 5; i++) {
      await user.click(incrementButton);
    }
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
  });

  // Test de accesibilidad - verificar que los botones tengan el texto correcto
  test('los botones muestran el texto correcto con step personalizado', () => {
    render(<Counter step={3} />);
    
    expect(screen.getByText('+ 3')).toBeInTheDocument();
    expect(screen.getByText('- 3')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
});
