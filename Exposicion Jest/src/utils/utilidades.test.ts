import { calculadora, stringUtils, arrayUtils, validadores } from './utilidades';

describe('Calculadora', () => {
  describe('operaciones básicas', () => {
    test('suma dos números correctamente', () => {
      expect(calculadora.sumar(2, 3)).toBe(5);
      expect(calculadora.sumar(-1, 1)).toBe(0);
      expect(calculadora.sumar(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('resta dos números correctamente', () => {
      expect(calculadora.restar(5, 3)).toBe(2);
      expect(calculadora.restar(0, 5)).toBe(-5);
    });

    test('multiplica dos números correctamente', () => {
      expect(calculadora.multiplicar(3, 4)).toBe(12);
      expect(calculadora.multiplicar(-2, 3)).toBe(-6);
      expect(calculadora.multiplicar(0, 100)).toBe(0);
    });

    test('divide dos números correctamente', () => {
      expect(calculadora.dividir(10, 2)).toBe(5);
      expect(calculadora.dividir(7, 2)).toBe(3.5);
    });

    test('lanza error al dividir por cero', () => {
      expect(() => calculadora.dividir(5, 0)).toThrow('No se puede dividir por cero');
    });
  });

  describe('operaciones avanzadas', () => {
    test('calcula potencias correctamente', () => {
      expect(calculadora.potencia(2, 3)).toBe(8);
      expect(calculadora.potencia(5, 0)).toBe(1);
      expect(calculadora.potencia(10, 2)).toBe(100);
    });

    test('calcula raíz cuadrada correctamente', () => {
      expect(calculadora.raizCuadrada(4)).toBe(2);
      expect(calculadora.raizCuadrada(9)).toBe(3);
      expect(calculadora.raizCuadrada(0)).toBe(0);
    });

    test('lanza error al calcular raíz cuadrada de número negativo', () => {
      expect(() => calculadora.raizCuadrada(-1)).toThrow('No se puede calcular la raíz cuadrada de un número negativo');
    });
  });
});

describe('String Utils', () => {
  test('capitaliza texto correctamente', () => {
    expect(stringUtils.capitalizar('hola')).toBe('Hola');
    expect(stringUtils.capitalizar('MUNDO')).toBe('Mundo');
    expect(stringUtils.capitalizar('')).toBe('');
    expect(stringUtils.capitalizar('a')).toBe('A');
  });

  test('cuenta palabras correctamente', () => {
    expect(stringUtils.contarPalabras('Hola mundo')).toBe(2);
    expect(stringUtils.contarPalabras('Una sola palabra')).toBe(3);
    expect(stringUtils.contarPalabras('')).toBe(0);
    expect(stringUtils.contarPalabras('   ')).toBe(0);
    expect(stringUtils.contarPalabras('palabra')).toBe(1);
  });

  test('detecta palíndromos correctamente', () => {
    expect(stringUtils.esPalindromo('oso')).toBe(true);
    expect(stringUtils.esPalindromo('A man a plan a canal Panama')).toBe(true);
    expect(stringUtils.esPalindromo('race a car')).toBe(false);
    expect(stringUtils.esPalindromo('Madam')).toBe(true);
  });

  test('invierte texto correctamente', () => {
    expect(stringUtils.invertir('hola')).toBe('aloh');
    expect(stringUtils.invertir('12345')).toBe('54321');
    expect(stringUtils.invertir('')).toBe('');
  });
});

describe('Array Utils', () => {
  test('obtiene el máximo correctamente', () => {
    expect(arrayUtils.obtenerMaximo([1, 5, 3, 9, 2])).toBe(9);
    expect(arrayUtils.obtenerMaximo([-1, -5, -3])).toBe(-1);
    expect(arrayUtils.obtenerMaximo([42])).toBe(42);
  });

  test('lanza error para array vacío en máximo', () => {
    expect(() => arrayUtils.obtenerMaximo([])).toThrow('El array no puede estar vacío');
  });

  test('obtiene el mínimo correctamente', () => {
    expect(arrayUtils.obtenerMinimo([1, 5, 3, 9, 2])).toBe(1);
    expect(arrayUtils.obtenerMinimo([-1, -5, -3])).toBe(-5);
  });

  test('calcula promedio correctamente', () => {
    expect(arrayUtils.calcularPromedio([1, 2, 3, 4, 5])).toBe(3);
    expect(arrayUtils.calcularPromedio([10, 20])).toBe(15);
    expect(arrayUtils.calcularPromedio([5])).toBe(5);
  });

  test('elimina duplicados correctamente', () => {
    expect(arrayUtils.eliminarDuplicados([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(arrayUtils.eliminarDuplicados(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    expect(arrayUtils.eliminarDuplicados([])).toEqual([]);
  });

  test('ordena ascendentemente', () => {
    expect(arrayUtils.ordenarAscendente([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
    expect(arrayUtils.ordenarAscendente([-1, 5, -3])).toEqual([-3, -1, 5]);
  });
});

describe('Validadores', () => {
  test('valida emails correctamente', () => {
    expect(validadores.esEmail('test@example.com')).toBe(true);
    expect(validadores.esEmail('user.name@domain.co.uk')).toBe(true);
    expect(validadores.esEmail('invalid.email')).toBe(false);
    expect(validadores.esEmail('test@')).toBe(false);
    expect(validadores.esEmail('@domain.com')).toBe(false);
  });

  test('valida números positivos', () => {
    expect(validadores.esNumeroPositivo(5)).toBe(true);
    expect(validadores.esNumeroPositivo(0.1)).toBe(true);
    expect(validadores.esNumeroPositivo(0)).toBe(false);
    expect(validadores.esNumeroPositivo(-1)).toBe(false);
    expect(validadores.esNumeroPositivo(NaN)).toBe(false);
  });

  test('valida contraseñas seguras', () => {
    expect(validadores.esContrasenaSegura('Password123')).toBe(true);
    expect(validadores.esContrasenaSegura('MiClave456')).toBe(true);
    expect(validadores.esContrasenaSegura('password')).toBe(false); // Sin mayúscula ni número
    expect(validadores.esContrasenaSegura('PASSWORD123')).toBe(false); // Sin minúscula
    expect(validadores.esContrasenaSegura('Password')).toBe(false); // Sin número
    expect(validadores.esContrasenaSegura('Pass1')).toBe(false); // Muy corta
  });

  test('valida fechas', () => {
    expect(validadores.esFechaValida('2023-12-25')).toBe(true);
    expect(validadores.esFechaValida('December 25, 2023')).toBe(true);
    // Note: JavaScript Date constructor is lenient with invalid dates
    expect(validadores.esFechaValida('no es una fecha')).toBe(false);
    expect(validadores.esFechaValida('')).toBe(false);
  });
});
