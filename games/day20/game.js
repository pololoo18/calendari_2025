// Day20 – Word Search with selectable & lockable words
(() => {
  const gridEl = document.getElementById("grid20");

  // 10x10 grid
  const size = 10;

  // Words with positions and directions
  // (r,c) row/column start – dir: dr/dc
  const words = [
    { w:"POP",   cells:[] },
    { w:"PUM",   cells:[] },
    { w:"JUAN",  cells:[] },
    { w:"JAIRO", cells:[] }
  ];

  // Letras de relleno
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ";

  // Pre-built grid with words well placed:
  // Rows indexed 0–9, Cols 0–9
  const board = [
    ["","","","","J","","","","",""],      // row 0
    ["","P","O","P","A","","","","",""],   // row 1
    ["","","","","I","","","","",""],      // row 2
    ["","","","","R","","P","","",""],     // row 3
    ["","","","","O","","U","","",""],     // row 4
    ["","","","","","","M","","",""],      // row 5
    ["","J","U","A","N","","","","",""],   // row 6
    ["","","","","","","","","",""],       // row 7
    ["","","","","","","","","",""],       // row 8
    ["","","","","","","","","",""]        // row 9
  ];

  // Rellenar los huecos vacíos con letras aleatorias
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      if(board[r][c]===""){
        board[r][c] = alphabet[Math.floor(Math.random()*alphabet.length)];
      }
    }
  }

  // Store cell references
  const cells = [];

  // Render grid
  for (let r=0; r<size; r++) {
    for (let c=0; c<size; c++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.innerText = board[r][c];
      div.dataset.r = r;
      div.dataset.c = c;
      gridEl.appendChild(div);
      cells.push(div);
    }
  }

  // Helper to get cell by row/col
  function cellAt(r,c){
    return cells[r*size + c];
  }

  // Precompute word cell coordinates based on layout
  words[0].cells = [ [1,1], [1,2], [1,3] ];              // POP
  words[1].cells = [ [3,6], [4,6], [5,6] ];              // PUM
  words[2].cells = [ [6,1], [6,2], [6,3], [6,4] ];       // JUAN
  words[3].cells = [ [0,4], [1,4], [2,4], [3,4], [4,4] ]; // JAIRO

  // Track status
  const found = new Set();

  // Click behavior
  cells.forEach(cell=>{
    cell.addEventListener("click",()=>{
      if(cell.classList.contains("found")) return;

      // toggle mark
      cell.classList.toggle("marked");

      checkWords();
    });
  });

  function checkWords(){
    words.forEach(word=>{
      if(found.has(word.w)) return;

      // Check if ALL cells of the word are marked
      const complete = word.cells.every(([r,c])=>{
        return cellAt(r,c).classList.contains("marked");
      });

      if(complete){
        found.add(word.w);

        // Lock and color green
        word.cells.forEach(([r,c])=>{
          const cc = cellAt(r,c);
          cc.classList.remove("marked");
          cc.classList.add("found");
        });

        // Check win
        if(found.size === words.length){
          if(window.__adv && window.__adv.finish){
            window.__adv.finish();
          }
        }
      }
    });
  }
})();
