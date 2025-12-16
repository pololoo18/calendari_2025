(() => {
  const boardEl = document.getElementById('d13board');
  const scoreEl = document.getElementById('d13score');
  const cols = 10, rows = 20;
  let board = [];
  let score = 0;
  const targetScore = 5;
  let gameOver = false;

  // crear tablero
  function createBoard() {
    boardEl.innerHTML = '';
    board = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        boardEl.appendChild(cell);
        row.push(cell);
      }
      board.push(row);
    }
  }

  // piezas simples (2x2)
  const pieces = [
    [[1,1],[1,1]], // cuadrado
    [[1,1,1,1]], // línea horizontal
    [[1,1,0],[0,1,1]], // S
    [[0,1,1],[1,1,0]], // Z
    [[1,1,1],[0,1,0]] // T
  ];

  let currentPiece = null;
  let pos = {x: 3, y:0};

  function spawnPiece() {
    const p = pieces[Math.floor(Math.random()*pieces.length)];
    currentPiece = JSON.parse(JSON.stringify(p));
    pos = {x:3,y:0};
    if (!canMove(0,0)) gameOverFn();
    draw();
  }

  function draw(clear=false) {
    // limpiar tablero
    board.forEach(row=>row.forEach(cell=>cell.classList.remove('active')));
    // dibujar piezas fijas
    board.forEach(row=>row.forEach(cell=>{}));
    // dibujar pieza actual
    currentPiece.forEach((r,i)=>{
      r.forEach((val,j)=>{
        if(val){
          const x = pos.x + j;
          const y = pos.y + i;
          if(y>=0 && x>=0 && y<rows && x<cols) board[y][x].classList.add('active');
        }
      });
    });
  }

  function canMove(dx,dy) {
    for(let i=0;i<currentPiece.length;i++){
      for(let j=0;j<currentPiece[i].length;j++){
        if(currentPiece[i][j]){
          const x = pos.x + j + dx;
          const y = pos.y + i + dy;
          if(x<0 || x>=cols || y>=rows) return false;
          if(board[y][x].classList.contains('fixed')) return false;
        }
      }
    }
    return true;
  }

  function fixPiece() {
    currentPiece.forEach((r,i)=>{
      r.forEach((val,j)=>{
        if(val){
          const x = pos.x + j;
          const y = pos.y + i;
          if(y>=0 && x>=0 && y<rows && x<cols) board[y][x].classList.add('fixed');
        }
      });
    });
  }

  function clearLines() {
    let linesCleared = 0;
    for(let r=rows-1;r>=0;r--){
      if(board[r].every(c=>c.classList.contains('fixed'))){
        linesCleared++;
        for(let y=r;y>0;y--){
          for(let x=0;x<cols;x++){
            if(board[y-1][x].classList.contains('fixed')){
              board[y][x].classList.add('fixed');
            } else board[y][x].classList.remove('fixed');
          }
        }
        for(let x=0;x<cols;x++) board[0][x].classList.remove('fixed');
        r++;
      }
    }
    score += linesCleared;
    scoreEl.innerText = score;
    if(score>=targetScore && !gameOver){
      gameOver = true;
      setTimeout(()=>{
        if(window.__adv?.finish) window.__adv.finish();
        else alert("¡Completado! La pista está en la caja de regalos.");
      },300);
    }
  }

  function moveDown() {
    if(canMove(0,1)){
      pos.y++;
      draw();
    } else {
      fixPiece();
      clearLines();
      spawnPiece();
    }
  }

  function move(dx) {
    if(canMove(dx,0)){
      pos.x += dx;
      draw();
    }
  }

  function rotate() {
    const rotated = currentPiece[0].length===currentPiece.length ? currentPiece : currentPiece[0].map((_,i)=>currentPiece.map(r=>r[i])).reverse();
    const prev = currentPiece;
    currentPiece = rotated;
    if(!canMove(0,0)) currentPiece = prev;
    draw();
  }

  function gameOverFn() {
    gameOver = true;
    alert("Has perdut 😢");
  }

  function init() {
    createBoard();
    spawnPiece();
    setInterval(()=>{if(!gameOver) moveDown();},500);
  }

  document.addEventListener('keydown', e=>{
    if(gameOver) return;
    if(e.key==='ArrowLeft') move(-1);
    else if(e.key==='ArrowRight') move(1);
    else if(e.key===' ' || e.key==='ArrowUp') rotate();
    else if(e.key==='ArrowDown') moveDown();
  });

  init();
})();
