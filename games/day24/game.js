// Day24 – Heart Puzzle
(() => {
  const board = document.getElementById("board24");
  const piecesEl = document.getElementById("pieces24");
  const msg = document.getElementById("msg24");

  // Crear las 9 celdas
  const cells = [];
  for (let i = 0; i < 9; i++) {
    const c = document.createElement("div");
    c.className = "cell";
    c.dataset.idx = i;
    board.appendChild(c);
    cells.push(c);
  }

  // Crear las 9 piezas
  const pieces = [...Array(9)].map((_, i) => i);
  pieces.sort(() => Math.random() - 0.5);

  pieces.forEach(i => {
    const p = document.createElement("div");
    p.className = "piece";
    p.draggable = true;

    const row = Math.floor(i / 3);
    const col = i % 3;

    // Imagen local + tamaño forzado + no-repeat
    p.style.backgroundImage = "url('games/day24/heart.png')";
    p.style.backgroundSize = "300px 300px";
    p.style.backgroundRepeat = "no-repeat";
    p.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

    p.dataset.correct = i;
    piecesEl.appendChild(p);
  });

  // Drag & Drop
  let dragged = null;

  document.querySelectorAll(".piece").forEach(p => {
    p.addEventListener("dragstart", () => (dragged = p));
  });

  cells.forEach(cell => {
    cell.addEventListener("dragover", e => e.preventDefault());
    cell.addEventListener("drop", () => {
      if (cell.children.length > 0) return;

      cell.appendChild(dragged);
      checkWin();
    });
  });

  function checkWin() {
    const allCorrect = cells.every(cell => {
      if (cell.children.length === 0) return false;
      const p = cell.children[0];
      return Number(p.dataset.correct) === Number(cell.dataset.idx);
    });

    if (allCorrect) showFinal();
  }

  function showFinal() {
    const heart = document.createElement("div");
    heart.className = "final-heart";

    // MISMA corrección aquí → tamaño forzado siempre
    heart.style.backgroundImage = "url('heart.png')";
    heart.style.backgroundSize = "300px 300px";
    heart.style.backgroundRepeat = "no-repeat";

    board.appendChild(heart);
    piecesEl.style.display = "none";

    setTimeout(() => {
      msg.innerHTML =
        "Gracias por llenar mi vida de amor.<br>Este corazón es tuyo, hoy y siempre.";
      msg.style.opacity = 1;

      if (window.__adv && window.__adv.finish) {
        window.__adv.finish({
          hint: "El último regalo está donde guardas tus cosas más queridas."
        });
      }
    }, 700);
  }
})();
