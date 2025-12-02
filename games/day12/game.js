(() => {
  const board = document.getElementById('d12board');
  const livesEl = document.getElementById('d12lives');
  const countEl = document.getElementById('d12count');

  const size = 9; // 3x3
  const target = 3; // número de renos a encontrar
  let lives, count, lost;

  function resetGame() {
    lives = 5;
    count = 0;
    lost = false;
    board.innerHTML = '';
    livesEl.innerText = lives;
    countEl.innerText = count;

    spawnCells();
  }

  function spawnCells() {
    for (let i = 0; i < size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      board.appendChild(cell);

      // clic en la casilla
      cell.addEventListener('click', () => {
        if (lost) return;
        if (cell.textContent) return; // ya clicada

        const found = Math.random() < 0.3; // probabilidad 30% de encontrar un reno
        if (found) {
          cell.textContent = '🦌';
          count++;
          countEl.innerText = count;
          if (count >= target) {
            setTimeout(() => {
              if (window.__adv?.finish)
                window.__adv.finish();
              else alert("¡Completado! La pista está en el árbol de Navidad.");
            }, 1000);
          }
        } else {
          cell.textContent = '❌';
          lives--;
          livesEl.innerText = lives;
          if (lives <= 0 && !lost) {
            lost = true;
            showLoseMessage();
          }
        }
      });
    }
  }

  function showLoseMessage() {
    const msg = document.createElement('div');
    msg.style.position = 'absolute';
    msg.style.top = '40%';
    msg.style.left = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.background = '#ffe6e6';
    msg.style.padding = '14px 20px';
    msg.style.borderRadius = '10px';
    msg.style.fontSize = '18px';
    msg.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
    msg.innerText = "Has perdut 😢 Reiniciant...";
    board.appendChild(msg);

    setTimeout(() => {
      msg.remove();
      resetGame();
    }, 3000);
  }

  resetGame();
})();
