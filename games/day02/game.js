// archivo cargado como module por main.js
// al completarse debe llamar a window.__adv.finish({hint:"..."})

// 0 = pared, 1 = camino, K = key, D = puerta, G = goal
const layout = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,1,1,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,0],
[0,0,0,0,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0],
[0,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,0],
[0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0],
[0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0],
[0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0],
[0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
[0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0],
[0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0],
[0,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0],
[0,1,1,1,0,1,1,1,0,'K',0,1,1,1,1,0,1,1,1,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,'D',0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,'G',0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];



// posición inicial
let px = 1, py = 1;

// estados
let hasKey = false;

const maze = document.getElementById('d04maze');

function draw(){
  maze.innerHTML = '';
  layout.forEach((row, y)=>{
    row.forEach((cell, x)=>{
      const div = document.createElement('div');
      div.classList.add('cell');

      if(cell === 0) div.classList.add('wall');
      else if(cell === 1) div.classList.add('path');
      else if(cell === 'G') div.classList.add('goal');
      else if(cell === 'D') div.classList.add('door');
      else if(cell === 'K') div.classList.add('key');

      if(x === px && y === py){
        div.classList.add('player');
        div.textContent = '🟦';
      } else if(cell === 'G'){
        div.textContent = '⭐';
      } else if(cell === 'K'){
        div.textContent = '🔑';
      } else if(cell === 'D'){
        div.textContent = '🚪';
      }

      // clic adyacente
      div.addEventListener('click', () => tryClickMove(x, y));

      maze.appendChild(div);
    });
  });
}

function canMove(nx, ny){
  const cell = layout[ny]?.[nx];
  if(cell == null) return false;

  if(cell === 0) return false;        // pared
  if(cell === 'D' && !hasKey) return false; // puerta cerrada
  return true;
}

function handleCell(nx, ny){
  const cell = layout[ny][nx];

  // recoger llave
  if(cell === 'K'){
    hasKey = true;
    layout[ny][nx] = 1; // ahora es camino
  }

  // abrir puerta
  if(cell === 'D' && hasKey){
    layout[ny][nx] = 1;
  }

  // ganar
  if(cell === 'G'){
    finish();
  }
}

function finish(){
  setTimeout(()=>{
    if(window.__adv?.finish){
      window.__adv.finish();
    }
  }, 300);
}

function move(dx, dy){
  const nx = px + dx;
  const ny = py + dy;

  if(!canMove(nx, ny)) return;

  px = nx;
  py = ny;

  handleCell(nx, ny);
  draw();
}

// teclado
document.addEventListener('keydown', e=>{
  if(e.key === 'ArrowUp') move(0,-1);
  if(e.key === 'ArrowDown') move(0,1);
  if(e.key === 'ArrowLeft') move(-1,0);
  if(e.key === 'ArrowRight') move(1,0);
});

// clic en casilla adyacente
function tryClickMove(x, y){
  const dx = Math.abs(x - px);
  const dy = Math.abs(y - py);

  if((dx === 1 && dy === 0) || (dx === 0 && dy === 1)){
    move(x - px, y - py);
  }
}

draw();
