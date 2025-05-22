
const { crearTablero, marcarCasilla, hayGanador, esEmpate } = require('./triki.js');

test('crearTablero genera un tablero vacío', () => {
  const tablero = crearTablero();
  expect(tablero.length).toBe(3);
  expect(tablero[0].length).toBe(3);
  expect(tablero.flat().every(cell => cell === null)).toBe(true);
});

test('marcarCasilla permite colocar un símbolo en una celda vacía', () => {
  const tablero = crearTablero();
  const result = marcarCasilla(tablero, 0, 0, 'X');
  expect(result).toBe(true);
  expect(tablero[0][0]).toBe('X');
});

test('marcarCasilla no permite sobreescribir una casilla ocupada', () => {
  const tablero = crearTablero();
  marcarCasilla(tablero, 0, 0, 'X');
  const result = marcarCasilla(tablero, 0, 0, 'O');
  expect(result).toBe(false);
  expect(tablero[0][0]).toBe('X');
});

test('hayGanador detecta una fila ganadora', () => {
  const tablero = [
    ['X', 'X', 'X'],
    [null, null, null],
    [null, null, null]
  ];
  expect(hayGanador(tablero)).toBe('X');
});

test('hayGanador detecta una columna ganadora', () => {
  const tablero = [
    ['O', null, null],
    ['O', null, null],
    ['O', null, null]
  ];
  expect(hayGanador(tablero)).toBe('O');
});

test('hayGanador detecta una diagonal ganadora', () => {
  const tablero = [
    ['X', null, null],
    [null, 'X', null],
    [null, null, 'X']
  ];
  expect(hayGanador(tablero)).toBe('X');
});

test('esEmpate detecta un empate sin ganador', () => {
  const tablero = [
    ['X', 'O', 'X'],
    ['X', 'O', 'O'],
    ['O', 'X', 'X']
  ];
  expect(esEmpate(tablero)).toBe(true);
});
