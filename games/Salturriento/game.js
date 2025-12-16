document.addEventListener("DOMContentLoaded", setupDinoGame);

function setupDinoGame() {
  const game = document.getElementById("d04dinogame");
  const dino = document.getElementById("d04dino");
  const scoreEl = document.getElementById("d04score");
  const goalEl = document.getElementById("d04goal");
  
  let jumping = false;
  let dinoBottom = 0;
  let obstacles = [];
  let score = 0;
  const goalScore = 5;
  
  goalEl.textContent = goalScore;

  function jump() {
    if (jumping) return;
    jumping = true;
    let upInterval = setInterval(() => {
      if (dinoBottom >= 80) {
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (dinoBottom <= 0) {
            clearInterval(downInterval);
            jumping = false;
            dinoBottom = 0;
            dino.style.bottom = dinoBottom + 'px';
          } else {
            dinoBottom -= 6;
            dino.style.bottom = dinoBottom + 'px';
          }
        }, 20);
      } else {
        dinoBottom += 6;
        dino.style.bottom = dinoBottom + 'px';
      }
    }, 20);
  }

  document.addEventListener("keydown", e => { if (e.code === "Space") jump(); });
  dino.addEventListener("click", jump);

  function createObstacle() {
    const obs = document.createElement("div");
    obs.className = "obstacle";
    let obsPos = 400;
    obs.style.left = obsPos + 'px';
    game.appendChild(obs);
    obstacles.push({el: obs, pos: obsPos});

    const moveInterval = setInterval(() => {
      obsPos -= 6;
      obs.style.left = obsPos + 'px';

      // colisión
      if (obsPos < 90 && obsPos > 50 && dinoBottom < 40) {
        resetGame();
        clearInterval(moveInterval);
      }

      if (obsPos < -20) {
        game.removeChild(obs);
        obstacles.shift();
        clearInterval(moveInterval);
        score++;
        scoreEl.textContent = score;
        if (score >= goalScore) finish();
      }
    }, 20);
  }

  function resetGame() {
    obstacles.forEach(o => game.removeChild(o.el));
    obstacles = [];
    score = 0;
    scoreEl.textContent = score;
  }

  function finish() {
    setTimeout(() => {
      if (window.__adv?.finish) {
        window.__adv.finish();
      }
    }, 300);
    resetGame();
  }

  // generar obstáculos cada 1.5-2.5s
  setInterval(() => { if(obstacles.length<3) createObstacle(); }, 1000 + Math.random()*1000);
}

setupDinoGame();