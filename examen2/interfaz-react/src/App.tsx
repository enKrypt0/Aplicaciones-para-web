import { CarritoProvider } from './context/CarritoContext';
import { Header, ProductGrid } from './components';
import './App.css';

function App() {
  return (
    <CarritoProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <ProductGrid />
        </main>
      </div>
    </CarritoProvider>
  );
}

export default App;
