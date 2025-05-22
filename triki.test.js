const {
  crearTablero,
  marcarCasilla,
  hayGanador,
  esEmpate
} = require('./triki.js');

describe('Funciones básicas del juego Triki', () => {
  test('crearTablero genera un tablero vacío de 3x3', () => {
    const tablero = crearTablero();
    expect(tablero.length).toBe(3);
    expect(tablero[0].length).toBe(3);
    expect(tablero.flat().every(cell => cell === null)).toBe(true);
  });

  test('marcarCasilla coloca correctamente un símbolo en una casilla vacía', () => {
    const tablero = crearTablero();
    const result = marcarCasilla(tablero, 1, 1, 'X');
    expect(result).toBe(true);
    expect(tablero[1][1]).toBe('X');
  });

  test('marcarCasilla no permite sobreescribir una casilla ocupada', () => {
    const tablero = crearTablero();
    marcarCasilla(tablero, 0, 0, 'X');
    const result = marcarCasilla(tablero, 0, 0, 'O');
    expect(result).toBe(false);
    expect(tablero[0][0]).toBe('X');
  });

  test('hayGanador detecta una fila completa con el mismo símbolo', () => {
    const tablero = [
      ['X', 'X', 'X'],
      [null, null, null],
      [null, null, null]
    ];
    expect(hayGanador(tablero)).toBe('X');
  });

  test('hayGanador detecta una columna completa con el mismo símbolo', () => {
    const tablero = [
      ['O', null, null],
      ['O', null, null],
      ['O', null, null]
    ];
    expect(hayGanador(tablero)).toBe('O');
  });

  test('hayGanador detecta una diagonal principal con el mismo símbolo', () => {
    const tablero = [
      ['X', null, null],
      [null, 'X', null],
      [null, null, 'X']
    ];
    expect(hayGanador(tablero)).toBe('X');
  });

  test('hayGanador detecta una diagonal secundaria con el mismo símbolo', () => {
    const tablero = [
      [null, null, 'O'],
      [null, 'O', null],
      ['O', null, null]
    ];
    expect(hayGanador(tablero)).toBe('O');
  });

  test('esEmpate detecta tablero lleno sin ganador', () => {
    const tablero = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X']
    ];
    expect(esEmpate(tablero)).toBe(true);
  });

  test('esEmpate no detecta empate si hay ganador', () => {
    const tablero = [
      ['X', 'X', 'X'],
      ['O', 'O', null],
      [null, null, null]
    ];
    expect(esEmpate(tablero)).toBe(false);
  });
});
