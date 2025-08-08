import React, { useState } from 'react';
import './Counter.css';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="counter">
      <h2>Contador</h2>
      <div className="counter-display" data-testid="counter-value">
        {count}
      </div>
      <div className="counter-buttons">
        <button 
          onClick={decrement}
          data-testid="decrement-button"
          className="counter-button decrement"
        >
          - {step}
        </button>
        <button 
          onClick={reset}
          data-testid="reset-button"
          className="counter-button reset"
        >
          Reset
        </button>
        <button 
          onClick={increment}
          data-testid="increment-button"
          className="counter-button increment"
        >
          + {step}
        </button>
      </div>
    </div>
  );
};

export default Counter;
