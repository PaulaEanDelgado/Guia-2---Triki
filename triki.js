
function crearTablero() {
  return Array(3).fill(null).map(() => Array(3).fill(null));
}

function marcarCasilla(tablero, fila, col, jugador) {
  if (!tablero[fila][col]) {
    tablero[fila][col] = jugador;
    return true;
  }
  return false;
}

function hayGanador(tablero) {
  // Revisar filas
  for (let i = 0; i < 3; i++) {
    if (tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
      return tablero[i][0];
    }
  }
  // Revisar columnas
  for (let i = 0; i < 3; i++) {
    if (tablero[0][i] && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
      return tablero[0][i];
    }
  }
  // Revisar diagonales
  if (tablero[0][0] && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
    return tablero[0][0];
  }
  if (tablero[0][2] && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
    return tablero[0][2];
  }
  return null;
}

function esEmpate(tablero) {
  return tablero.flat().every(c => c !== null) && !hayGanador(tablero);
}

module.exports = {
  crearTablero,
  marcarCasilla,
  hayGanador,
  esEmpate
};
