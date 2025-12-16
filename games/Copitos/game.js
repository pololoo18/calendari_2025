// Día 3 - Minijuego "Encuentra los 3 Copos Gemelos"
// Módulo JS

document.addEventListener("DOMContentLoaded", setupSnowGame);

function setupSnowGame() {
  const grid = document.getElementById("d03snowgrid");
  const icons = ["❄️", "✳️", "✦", "✺", "✵", "★"];
  
  const baseIcon = icons[Math.floor(Math.random() * icons.length)];
  
  const cells = [];
  
  // Crear 33 celdas totales, solo 3 correctas
  const total = 16;
  const correctIndices = pickRandom(3, total);

  for (let i = 0; i < total; i++) {
    const div = document.createElement("div");
    div.className = "cell";

    if (correctIndices.includes(i)) {
      div.dataset.correct = "1";
      div.textContent = baseIcon;
    } else {
      div.textContent = icons[Math.floor(Math.random() * icons.length)];
    }

    div.addEventListener("click", () => handleClick(div));
    cells.push(div);
    grid.appendChild(div);
  }

  let found = 0;

  function handleClick(cell) {
    if (cell.dataset.correct === "1") {
      cell.classList.add("correct");
      found++;

      if (found === 3) {
        setTimeout(() => {
          if (window.__adv?.finish) {
            window.__adv.finish();
          }
        }, 500);
      }

    } else {
      // fallo → reinicio rápido
      cells.forEach(c => c.classList.remove("correct", "wrong"));
      cell.classList.add("wrong");
      setTimeout(() => {
        cells.forEach(c => c.classList.remove("wrong"));
      }, 400);
      found = 0;
    }
  }

  function pickRandom(count, max) {
    const set = new Set();
    while (set.size < count) {
      set.add(Math.floor(Math.random() * max));
    }
    return [...set];
  }
}

setupSnowGame();