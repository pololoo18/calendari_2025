document.addEventListener("DOMContentLoaded", setupSnake);

function setupSnake() {
  const boardEl = document.getElementById("d08board");
  const scoreEl = document.getElementById("d08score");
  const goalEl = document.getElementById("d08goal");
  const size = 10;
  const goalScore = 10;
  goalEl.textContent = goalScore;

  let interval;

  function startGame() {
    const cells = [];
    boardEl.innerHTML = "";

    for(let r=0;r<size;r++){
      cells[r] = [];
      for(let c=0;c<size;c++){
        const div = document.createElement("div");
        div.className = "cell";
        boardEl.appendChild(div);
        cells[r][c] = div;
      }
    }

    let snake = [{r:5,c:5}];
    let dir = {r:0,c:1};
    let food = spawnFood();
    let score = 0;
    let speed = 400; // intervalo inicial

    // generar manzana evitando bordes
    function spawnFood(){
      let empty = [];
      for(let r=1;r<size-1;r++){       // filas sin bordes
        for(let c=1;c<size-1;c++){     // columnas sin bordes
          if(!snake.some(s=>s.r===r && s.c===c)) empty.push({r,c});
        }
      }
      const f = empty[Math.floor(Math.random()*empty.length)];
      return f;
    }

    function render(){
      cells.flat().forEach(cell=>cell.className="cell");
      snake.forEach(s=>cells[s.r][s.c].classList.add("snake"));
      cells[food.r][food.c].classList.add("food");
      scoreEl.textContent = score;
    }

    function move(){
      const head = {r:snake[0].r + dir.r, c:snake[0].c + dir.c};

      if(head.r<0 || head.r>=size || head.c<0 || head.c>=size || snake.some(s=>s.r===head.r && s.c===head.c)){
        clearInterval(interval);
        alert("Has perdut :(");
        return;
      }

      snake.unshift(head);

      if(head.r===food.r && head.c===food.c){
        score++;
        speed = Math.max(100, 400 - score*30); // velocidad progresiva
        clearInterval(interval);
        interval = setInterval(move, speed);

        if(score>=goalScore){
          clearInterval(interval);
          setTimeout(()=>{
            if(window.__adv?.finish){
              window.__adv.finish({hint: "La pista del día 8 está en la maceta del balcón."});
            } else {
              alert("¡Completado! Pista: En la maceta del balcón.");
            }
          },300);
          return;
        }

        food = spawnFood();
      } else {
        snake.pop();
      }

      render();
    }

    function changeDir(e){
      switch(e.key){
        case "ArrowUp": if(dir.r!==1){dir={r:-1,c:0}} break;
        case "ArrowDown": if(dir.r!==-1){dir={r:1,c:0}} break;
        case "ArrowLeft": if(dir.c!==1){dir={r:0,c:-1}} break;
        case "ArrowRight": if(dir.c!==-1){dir={r:0,c:1}} break;
      }
    }

    document.removeEventListener("keydown", changeDir);
    document.addEventListener("keydown", changeDir);

    render();
    interval = setInterval(move, speed);
  }

  startGame();
}

setupSnake();