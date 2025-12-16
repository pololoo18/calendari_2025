(() => {
  const board = document.getElementById('d10board');
  const paddle = document.getElementById('d10paddle');
  const ball = document.getElementById('d10ball');
  const scoreEl = document.getElementById('d10score');

  const boardWidth = board.clientWidth;
  const boardHeight = board.clientHeight;
  const paddleWidth = paddle.clientWidth;

  function startGame() {
    // reiniciar paddle
    let paddleX = (boardWidth - paddleWidth)/2;
    paddle.style.left = paddleX + 'px';

    // reiniciar ladrillos
    board.querySelectorAll('.brick')?.forEach(b=>board.removeChild(b));
    const rows = 3;
    const cols = 5;
    const brickWidth = 60;
    const brickHeight = 20;
    const bricks = [];
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const b = document.createElement('div');
        b.className = 'brick';
        b.style.top = (r*brickHeight)+'px';
        b.style.left = (c*brickWidth)+'px';
        board.appendChild(b);
        bricks.push(b);
      }
    }
    let bricksRemaining = bricks.length;
    scoreEl.textContent = bricksRemaining;

    // reiniciar bola
    let ballX = boardWidth/2 - 6;
    let ballY = boardHeight/2;
    let baseSpeed = 2;
    let ballDX = baseSpeed;
    let ballDY = -baseSpeed;
    ball.style.left = ballX+'px';
    ball.style.top = ballY+'px';

    // mover paddle
    function movePaddle(e){
      if(e.key==='ArrowLeft') paddleX = Math.max(0, paddleX-20);
      if(e.key==='ArrowRight') paddleX = Math.min(boardWidth-paddleWidth, paddleX+20);
      paddle.style.left = paddleX+'px';
    }

    document.removeEventListener("keydown", movePaddle);
    document.addEventListener('keydown', movePaddle);

    function update(){
      // mover bola
      ballX += ballDX;
      ballY += ballDY;

      // rebote paredes
      if(ballX<=0 || ballX>=boardWidth-12) ballDX*=-1;
      if(ballY<=0) ballDY*=-1;

      // rebote paddle
      if(ballY+12 >= boardHeight-12 && ballX+12 >= paddleX && ballX <= paddleX+paddleWidth){
        ballDY*=-1;
        ballY = boardHeight-12-12; 
      }

      // colisión ladrillos
      for(let i=bricks.length-1;i>=0;i--){
        const b = bricks[i];
        const bx = parseFloat(b.style.left);
        const by = parseFloat(b.style.top);
        if(ballX+12 > bx && ballX < bx+brickWidth && ballY+12 > by && ballY < by+brickHeight){
          ballDY*=-1;
          board.removeChild(b);
          bricks.splice(i,1);
          bricksRemaining--;
          scoreEl.textContent = bricksRemaining;

          // aumentar velocidad proporcionalmente a los ladrillos destruidos
          let speedMultiplier = 2 + (bricks.length - bricksRemaining)/bricks.length;
          ballDX = Math.sign(ballDX)*baseSpeed*speedMultiplier;
          ballDY = Math.sign(ballDY)*baseSpeed*speedMultiplier;

          break;
        }
      }

      // bola fuera de la parte inferior → reinicio
      if(ballY > boardHeight){
        alert("Has perdut :(");
        return;
      }

      ball.style.left = ballX+'px';
      ball.style.top = ballY+'px';

      if(bricksRemaining<=0){
        setTimeout(()=>{
          if(window.__adv?.finish) window.__adv.finish();
          else alert("¡Completado! Pista: En el estante del salón.");
        },300);
        return;
      }

      requestAnimationFrame(update);
    }

    update();
  }

  startGame();
})();
