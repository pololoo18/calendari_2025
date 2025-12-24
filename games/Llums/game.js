// Minijuego Lights Out 3x3
(() => {
  const boardEl = document.getElementById('lBoard');
  const msgEl = document.getElementById('lMsg');

  const size = 3;
  let cells = [];

  function index(x, y) {
    return y * size + x;
  }

  function toggle(x, y) {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    cells[index(x, y)].classList.toggle('on');
  }

  function handleClick(x, y) {
    toggle(x, y);
    toggle(x + 1, y);
    toggle(x - 1, y);
    toggle(x, y + 1);
    toggle(x, y - 1);
    checkWin();
  }

  function checkWin() {
    const anyOn = cells.some(c => c.classList.contains('on'));
    if (!anyOn) {
      msgEl.textContent = 'Perfecte! 💡';
      setTimeout(() => {
        if (window.__adv && window.__adv.finish) {
          window.__adv.finish({});
        }
      }, 600);
    }
  }

  function setup() {
    boardEl.innerHTML = '';
    cells = [];

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const c = document.createElement('div');
        c.className = 'cell';
        if (Math.random() > 0.5) c.classList.add('on');
        c.addEventListener('click', () => handleClick(x, y));
        boardEl.appendChild(c);
        cells.push(c);
      }
    }

    // evitar estado ya resuelto
    if (!cells.some(c => c.classList.contains('on'))) {
      cells[0].classList.add('on');
    }
  }

  setup();
})();
