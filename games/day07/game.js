document.addEventListener("DOMContentLoaded", setupSudoku4x4);

function setupSudoku4x4() {
  const boardEl = document.getElementById("d07board");
  const pickerEl = document.getElementById("d07picker");

  const size = 4;
  const solution = [
    [1,2,3,4],
    [3,4,1,2],
    [2,1,4,3],
    [4,3,2,1]
  ];

  // posiciones prellenadas (puedes cambiar la dificultad)
  const prefilled = [
    [0,1],[1,2],[2,3],[3,0]
  ];

  const cells = [];

  // crear tablero
  for (let r=0; r<size; r++) {
    cells[r] = [];
    for (let c=0; c<size; c++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.dataset.row = r;
      div.dataset.col = c;

      // prefilled
      if (prefilled.some(p => p[0]===r && p[1]===c)) {
        div.classList.add("prefilled");
        div.textContent = solution[r][c];
      } else {
        div.addEventListener("click", () => selectCell(r,c));
      }

      boardEl.appendChild(div);
      cells[r][c] = div;
    }
  }

  let selectedCell = null;

  function selectCell(r,c) {
    selectedCell = {r,c};
    // resaltar celda seleccionada
    cells.flat().forEach(cell => cell.style.borderColor = "#ccc");
    cells[r][c].style.borderColor = "var(--accent-2)";
  }

  // crear selector de números
  for (let n=1;n<=size;n++) {
    const btn = document.createElement("button");
    btn.className = "number-btn";
    btn.textContent = n;
    btn.addEventListener("click", () => {
      if (selectedCell) {
        const {r,c} = selectedCell;
        cells[r][c].textContent = n;
        checkWin();
      }
    });
    pickerEl.appendChild(btn);
  }

  function checkWin() {
    for (let r=0;r<size;r++){
      for (let c=0;c<size;c++){
        if (Number(cells[r][c].textContent) !== solution[r][c]) return;
      }
    }
    setTimeout(()=> {
      if(window.__adv?.finish){
        window.__adv.finish();
      }
    },300);
  }
}

setupSudoku4x4();