// Trileros con animación y contador de mezclas
(() => {
  const table = document.getElementById('tTable');
  const msg = document.getElementById('tMsg');
  const countEl = document.getElementById('tCount');

  const positions = [0, 95, 190];
  let cups = [];
  let giftCup = null;
  let locked = true;
  let movesLeft = 6;

  function setup() {
    table.innerHTML = '';
    cups = [];
    locked = true;
    movesLeft = 6;

    msg.textContent = 'Observa bé…';
    countEl.textContent = `Moviments: ${movesLeft}`;

    const giftIndex = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
      const c = document.createElement('div');
      c.className = 'cup';
      c.style.transform = `translateX(${positions[i]}px)`;
      c.textContent = i === giftIndex ? '🎁' : '🎩';
      table.appendChild(c);
      cups.push(c);
      if (i === giftIndex) giftCup = c;
    }

    setTimeout(() => {
      cups.forEach(c => c.textContent = '🎩');
      shuffle();
    }, 900);
  }

  function shuffle() {
    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * 3);
      const b = Math.floor(Math.random() * 3);
      if (a === b) return;

      const posA = cups[a].style.transform;
      const posB = cups[b].style.transform;

      cups[a].style.transform = posB;
      cups[b].style.transform = posA;

      [cups[a], cups[b]] = [cups[b], cups[a]];

      movesLeft--;
      countEl.textContent = `Moviments: ${movesLeft}`;

      if (movesLeft <= 0) {
        clearInterval(interval);
        locked = false;
        msg.textContent = 'On està el regal?';
        countEl.textContent = 'Tria!';
        cups.forEach(c => c.onclick = () => choose(c));
      }
    }, 500);
  }

  function choose(cup) {
    if (locked) return;
    locked = true;

    cups.forEach(c => c.classList.add('disabled'));

    if (cup === giftCup) {
      cup.textContent = '🎁';
      msg.textContent = 'Correcte! 🎉';
      setTimeout(() => {
        if (window.__adv && window.__adv.finish) {
          window.__adv.finish({});
        }
      }, 700);
    } else {
      cup.textContent = '❌';
      msg.textContent = 'Has fallat 😅 Reiniciant...';
      setTimeout(setup, 2000);
    }
  }

  setup();
})();
