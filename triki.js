const readline = require('readline');

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
  for (let i = 0; i < 3; i++) {
    if (tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
      return tablero[i][0];
    }
    if (tablero[0][i] && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
      return tablero[0][i];
    }
  }

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

// Lógica interactiva aquí ↓↓↓↓↓

function iniciarJuego() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let tablero = crearTablero();
  let jugadores = {};
  let simbolos = {};
  let turnoActual = '';

  function mostrarTablero() {
    console.clear();
    console.log("Tablero actual:");
    console.table(tablero);
  }

  function preguntarNombreYSimbolo() {
    rl.question("Nombre del Jugador 1: ", (nombre1) => {
      rl.question(`${nombre1}, ¿quieres ser X u O? `, (simbolo1) => {
        simbolo1 = simbolo1.toUpperCase();
        if (simbolo1 !== 'X' && simbolo1 !== 'O') {
          console.log("Símbolo inválido. Elige X o O.");
          return preguntarNombreYSimbolo();
        }

        const simbolo2 = simbolo1 === 'X' ? 'O' : 'X';

        rl.question("Nombre del Jugador 2: ", (nombre2) => {
          jugadores = {
            [simbolo1]: nombre1,
            [simbolo2]: nombre2
          };
          simbolos = {
            [nombre1]: simbolo1,
            [nombre2]: simbolo2
          };
          turnoActual = nombre1;
          mostrarTablero();
          preguntarJugada();
        });
      });
    });
  }

  function preguntarJugada() {
    rl.question(`${turnoActual} (${simbolos[turnoActual]}), ingresa tu jugada (fila,columna): `, (entrada) => {
      const [fila, col] = entrada.split(',').map(Number);

      if (isNaN(fila) || isNaN(col) || fila < 0 || fila > 2 || col < 0 || col > 2) {
        console.log("Entrada inválida. Usa formato: fila,columna");
        return preguntarJugada();
      }

      const simbolo = simbolos[turnoActual];
      const jugadaValida = marcarCasilla(tablero, fila, col, simbolo);

      if (!jugadaValida) {
        console.log("Casilla ocupada. Intenta de nuevo.");
        return preguntarJugada();
      }

      mostrarTablero();

      const ganador = hayGanador(tablero);
      if (ganador) {
        console.log(`🎉 ¡${jugadores[ganador]} ha ganado con ${ganador}!`);
        return rl.close();
      }

      if (esEmpate(tablero)) {
        console.log("🤝 ¡Empate!");
        return rl.close();
      }

      turnoActual = turnoActual === Object.keys(simbolos)[0] ? Object.keys(simbolos)[1] : Object.keys(simbolos)[0];
      preguntarJugada();
    });
  }

  preguntarNombreYSimbolo();
}

// Exportamos todo para test y ejecución
module.exports = {
  crearTablero,
  marcarCasilla,
  hayGanador,
  esEmpate,
  iniciarJuego
};
