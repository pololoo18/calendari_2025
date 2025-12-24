// Minijuego Ahorcado con dibujo progresivo
(() => {
  const words = [
    "GAMBURRIENTA",
    "PITUFA",
    "ROBOTIN",
    "JUAN",
    "JAIRO",
    "PUM",
    "BERRINCHUDA"
  ];

  const stages = [
`



`,
`
  😵
`,
`
  😵
   |
`,
`
  😵
  /|
`,
`
  😵
  /|\\
`,
`
  😵
  /|\\
  /
`,
`
  😵
  /|\\
  / \\
`
  ];

  const maxLives = stages.length - 1;
  let word, revealed, lives;

  const wordEl = document.getElementById('hWord');
  const lettersEl = document.getElementById('hLetters');
  const livesEl = document.getElementById('hLives');
  const msgEl = document.getElementById('hMsg');

  function reset() {
    word = words[Math.floor(Math.random() * words.length)];
    revealed = Array(word.length).fill('_');
    lives = maxLives;

    lettersEl.innerHTML = '';
    msgEl.textContent = '';

    update();

    'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').forEach(l => {
      const b = document.createElement('button');
      b.textContent = l;
      b.onclick = () => guess(l, b);
      lettersEl.appendChild(b);
    });
  }

  function update() {
    wordEl.textContent = revealed.join(' ');
    const lost = maxLives - lives;
    livesEl.innerHTML = `
      <div style="white-space:pre;font-family:monospace">
        ${stages[lost]}
      </div>
      <div>${'❤️'.repeat(lives)}</div>
    `;
  }

  function guess(letter, btn) {
    if (btn.classList.contains('used')) return;
    btn.classList.add('used');

    if (word.includes(letter)) {
      [...word].forEach((c, i) => {
        if (c === letter) revealed[i] = c;
      });
    } else {
      lives--;
    }

    update();
    check();
  }

  function check() {
    if (!revealed.includes('_')) {
      msgEl.textContent = "Paraula correcta! 🎉";
      setTimeout(() => {
        if (window.__adv && window.__adv.finish) {
          window.__adv.finish({});
        }
      }, 600);
    }

    if (lives <= 0) {
      msgEl.textContent = "Has perdut 😢 Reiniciant...";
      setTimeout(reset, 2000);
    }
  }

  reset();
})();
