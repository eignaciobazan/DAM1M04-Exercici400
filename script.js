// puzzle.js

// Configuración
const ROWS = 3;
const COLS = 3;
const puzzle = document.getElementById('puzzle');
const message = document.getElementById('message');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
let movecount =0;

// Inicializamos el tablero leyendo los elementos img
let tiles = Array.from(puzzle.querySelectorAll('img'));

// Devuelve el índice (0..8) de la casilla vacía
function getEmptyIndex() {
  return tiles.findIndex(t => t.classList.contains('empty'));
}

// Devuelve el índice del elemento clicado
function getTileIndex(tile) {
  return tiles.indexOf(tile);
}

// Comprueba si dos índices son adyacentes en la cuadrícula 3x3
function isAdjacent(index1, index2) {
  const r1 = Math.floor(index1 / COLS);
  const c1 = index1 % COLS;
  const r2 = Math.floor(index2 / COLS);
  const c2 = index2 % COLS;

  // adyacente si distancia Manhattan = 1
  return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

// Intercambia la imagen y la clase empty entre dos índices
function swapTiles(i1, i2) {
  const t1 = tiles[i1];
  const t2 = tiles[i2];

  // intercambiamos src y alt
  const src1 = t1.src;
  const alt1 = t1.alt;
  const src2 = t2.src;
  const alt2 = t2.alt;

  t1.src = src2;
  t1.alt = alt2;
  t2.src = src1;
  t2.alt = alt1;

  // intercambiamos la clase empty si corresponde
  const empty1 = t1.classList.contains('empty');
  const empty2 = t2.classList.contains('empty');

  if (empty1) {
    t1.classList.remove('empty');
    t2.classList.add('empty');
  } else if (empty2) {
    t2.classList.remove('empty');
    t1.classList.add('empty');
  }
}

// Comprueba si el puzzle está resuelto
function isSolved() {
  // Definimos el orden objetivo por alt o por nombre de archivo
  // Aquí asumimos que las imágenes correctas en orden son: 1,2,3,4,5,6,7,8,9
  const correctOrder = ['0','1','2','3','4','5','6','7','8'];
  for (let i = 0; i < tiles.length; i++) {
    // extraemos el número del alt (o del nombre de archivo)
    const alt = tiles[i].alt.replace(/\D/g,''); // deja solo dígitos
    if (alt !== correctOrder[i]) return false;
  }
  return true;
}

// Manejador de click en una pieza
function onTileClick(e) {
  const tile = e.currentTarget;
  const tileIndex = getTileIndex(tile);
  const emptyIndex = getEmptyIndex();
  
  if (isAdjacent(tileIndex, emptyIndex)) {
    swapTiles(tileIndex, emptyIndex);
    movecount++;
    updateCounter();
    
    if (isSolved()) {
      message.textContent = '¡Felicidades! Puzzle resuelto.';
    } else {
      message.textContent = '';
    }
  }
}
function updateCounter() {
  const count = document.getElementById('count');
  count.textContent = `Movimientos: ${movecount}`;
}


// Añadimos listeners a las piezas
function attachListeners() {
  tiles.forEach(t => {
    t.removeEventListener('click', onTileClick);
    t.addEventListener('click', onTileClick);
  });
}

// Mezcla el puzzle realizando movimientos válidos aleatorios
function shuffle(moves = 100) {
  let emptyIndex = getEmptyIndex();
  for (let i = 0; i < moves; i++) {
    // obtenemos vecinos válidos de la casilla vacía
    const neighbors = [];
    const r = Math.floor(emptyIndex / COLS);
    const c = emptyIndex % COLS;
    const deltas = [
      {dr: -1, dc: 0},
      {dr: 1, dc: 0},
      {dr: 0, dc: -1},
      {dr: 0, dc: 1}
    ];
    deltas.forEach(d => {
      const nr = r + d.dr;
      const nc = c + d.dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        neighbors.push(nr * COLS + nc);
      }
    });

    // elegimos un vecino aleatorio y lo intercambiamos con la vacía
    const randIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
    swapTiles(emptyIndex, randIndex);
    emptyIndex = randIndex;
  }
  message.textContent = '';
}

// Reinicia al estado inicial definido en el HTML
function resetToInitial() {
  // Si quieres, puedes recargar la página para volver al HTML original:
  // location.reload();
  // O mantener una copia del estado inicial y restaurarla. Aquí recargamos:
  location.reload();
}

// Inicialización
attachListeners();
shuffleBtn.addEventListener('click', () => {
  shuffle(200); // más movimientos = mezcla más profunda
  // actualizamos la lista de tiles porque sus src/alt cambiaron
  tiles = Array.from(puzzle.querySelectorAll('img'));
  attachListeners();
});
resetBtn.addEventListener('click', resetToInitial);

//Contador



