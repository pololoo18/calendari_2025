document.addEventListener("DOMContentLoaded", setupPuzzleGame3x3);

function setupPuzzleGame3x3() {
  const board = document.getElementById("d05board");

  // Imagen de ejemplo
  const imageURL = "games/Puzzle/heart.png"; 
  const size = 3; // 3x3
  const pieceSize = 100; // cada pieza 100x100 px
  const pieces = [];

  // crear piezas con posición correcta
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.className = "piece";
    div.dataset.correct = i;

    const row = Math.floor(i / size);
    const col = i % size;

    div.style.backgroundImage = `url(${imageURL})`;
    div.style.backgroundSize = `${size * pieceSize}px ${size * pieceSize}px`;
    div.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;

    board.appendChild(div);
    pieces.push(div);
  }

  // mezclar piezas
  shuffle(pieces);
  pieces.forEach(div => board.appendChild(div));

  let first = null;

  pieces.forEach(piece => {
    piece.addEventListener("click", () => {
      if (!first) {
        first = piece;
        piece.style.border = "2px solid var(--accent-2)";
      } else {
        swapPieces(first, piece);
        first.style.border = "1px solid #ccc";
        first = null;
        checkWin();
      }
    });
  });

  function swapPieces(a, b) {
    const aNext = a.nextSibling;
    const bNext = b.nextSibling;
    const parent = a.parentNode;

    parent.insertBefore(a, bNext);
    parent.insertBefore(b, aNext);
  }

  function checkWin() {
    const current = Array.from(board.children);
    if (current.every((div, i) => Number(div.dataset.correct) === i)) {
      setTimeout(() => {
        if (window.__adv?.finish) {
          window.__adv.finish();
        }
      }, 1000);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

setupPuzzleGame3x3();