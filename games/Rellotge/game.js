// Día 13 - Reloj interno (difícil)
(() => {
  const btn = document.getElementById('d13btn');
  const bar = document.getElementById('d13bar');
  const msg = document.getElementById('d13msg');

  let start = null;
  let running = false;
  let raf;

  const TARGET = 10;
  const MARGIN = 0.35;

  function reset() {
    running = false;
    start = null;
    bar.style.width = '0%';
    btn.textContent = 'Iniciar';
    msg.textContent = '';
  }

  function loop() {
    if (!running) return;
    const t = (performance.now() - start) / 1000;

    // barra engañosa (no lineal)
    const fake = Math.min(100, (t / 12) * 100);
    bar.style.width = fake + '%';

    raf = requestAnimationFrame(loop);
  }

  btn.addEventListener('click', () => {
    if (!running) {
      running = true;
      start = performance.now();
      btn.textContent = 'Stop';
      msg.textContent = '';
      loop();
    } else {
      running = false;
      cancelAnimationFrame(raf);

      const elapsed = (performance.now() - start) / 1000;
      const diff = Math.abs(elapsed - TARGET);

      if (diff <= MARGIN) {
        msg.textContent = `¡Perfecte! (${elapsed.toFixed(2)}s) 🎯`;
        setTimeout(() => {
          if (window.__adv && window.__adv.finish) {
            window.__adv.finish({});
          }
        }, 700);
      } else {
        msg.textContent = `T'has anat a ${elapsed.toFixed(2)}s 😅`;
        setTimeout(reset, 2000);
      }
    }
  });

  reset();
})();
