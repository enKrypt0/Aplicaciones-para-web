// Utilidades matemáticas para demostrar testing de funciones puras

export const calculadora = {
  sumar: (a: number, b: number): number => a + b,
  restar: (a: number, b: number): number => a - b,
  multiplicar: (a: number, b: number): number => a * b,
  dividir: (a: number, b: number): number => {
    if (b === 0) {
      throw new Error('No se puede dividir por cero');
    }
    return a / b;
  },
  potencia: (base: number, exponente: number): number => Math.pow(base, exponente),
  raizCuadrada: (numero: number): number => {
    if (numero < 0) {
      throw new Error('No se puede calcular la raíz cuadrada de un número negativo');
    }
    return Math.sqrt(numero);
  }
};

// Utilidades de cadenas
export const stringUtils = {
  capitalizar: (texto: string): string => {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  },
  
  contarPalabras: (texto: string): number => {
    if (!texto.trim()) return 0;
    return texto.trim().split(/\s+/).length;
  },
  
  esPalindromo: (texto: string): boolean => {
    const textoLimpio = texto.toLowerCase().replace(/[^a-z0-9]/g, '');
    return textoLimpio === textoLimpio.split('').reverse().join('');
  },
  
  invertir: (texto: string): string => {
    return texto.split('').reverse().join('');
  }
};

// Utilidades de arrays
export const arrayUtils = {
  obtenerMaximo: (numeros: number[]): number => {
    if (numeros.length === 0) {
      throw new Error('El array no puede estar vacío');
    }
    return Math.max(...numeros);
  },
  
  obtenerMinimo: (numeros: number[]): number => {
    if (numeros.length === 0) {
      throw new Error('El array no puede estar vacío');
    }
    return Math.min(...numeros);
  },
  
  calcularPromedio: (numeros: number[]): number => {
    if (numeros.length === 0) {
      throw new Error('El array no puede estar vacío');
    }
    const suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma / numeros.length;
  },
  
  eliminarDuplicados: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },
  
  ordenarAscendente: (numeros: number[]): number[] => {
    return [...numeros].sort((a, b) => a - b);
  }
};

// Utilidades de validación
export const validadores = {
  esEmail: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  esNumeroPositivo: (numero: number): boolean => {
    return typeof numero === 'number' && numero > 0 && !isNaN(numero);
  },
  
  esContrasenaSegura: (contrasena: string): boolean => {
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return regex.test(contrasena);
  },
  
  esFechaValida: (fecha: string): boolean => {
    const date = new Date(fecha);
    return date instanceof Date && !isNaN(date.getTime());
  }
};
