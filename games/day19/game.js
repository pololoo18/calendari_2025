(() => {
  const sky = document.getElementById('sky19');
  const livesEl = document.getElementById('lives19');
  const countEl = document.getElementById('count19');

  let lives, count, spawned, lost, fallen;

  function resetGame() {
    lives = 5;
    count = 0;
    spawned = 0;
    fallen = 0;
    lost = false;

    sky.innerHTML = "";
    updateUI();
    spawn();
  }

  function updateUI() {
    livesEl.innerText = "❤️".repeat(lives) + "♡".repeat(5 - lives);
    countEl.innerText = count + "/10";
  }

  function loseLife() {
    lives--;
    updateUI();

    if (lives <= 0 && !lost) {
      lost = true;
      showLoseMessage();
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
    msg.innerText = "Has perdido 😢 Reiniciando...";
    sky.appendChild(msg);

    setTimeout(() => {
      msg.remove();
      resetGame();
    }, 3000);
  }

  function spawn() {
    if (spawned >= 20 || lost) return;
    spawned++;

    const f = document.createElement('div');
    f.className = 'flake';
    f.innerText = '❄️';

    const x = Math.random() * (sky.clientWidth - 30);
    f.style.left = x + 'px';
    f.style.top = '-30px';

    sky.appendChild(f);

    let top = -30;
    const fallSpeed = 2 + Math.random() * 2;

    const groundLevel = sky.clientHeight - 40; 
    // 40 px = margen para asegurar que lo ves tocar el suelo

    const id = setInterval(() => {
      if (lost) {
        clearInterval(id);
        if (f.parentNode) f.remove();
        return;
      }

      top += fallSpeed;
      f.style.top = top + 'px';

      // Toca suelo visible
      if (top > sky.clientHeight - 10) {
        clearInterval(id);
        if (f.parentNode) f.remove();

        fallen++;
        if (fallen >= 3) {
          fallen = 0;   // reiniciamos
          loseLife();   // pierdes 1 vida cada 3 caídos
        }
      }

    }, 30);

    // clic
    f.addEventListener('click', () => {
      if (lost) return;
      count++;
      updateUI();
      f.remove();

      if (count >= 10) {
        if (window.__adv && window.__adv.finish)
          window.__adv.finish();
      }
    });

    setTimeout(spawn, 350);
  }

  resetGame();
})();
