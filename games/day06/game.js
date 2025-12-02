document.addEventListener("DOMContentLoaded", setupMemoryColors);

function setupMemoryColors() {
  const buttons = Array.from(document.querySelectorAll('#d06board .color-btn'));
  const sequenceLength = 5;
  const sequence = [];
  let userIndex = 0;
  let inputEnabled = false;

  // generar secuencia aleatoria
  for (let i = 0; i < sequenceLength; i++) {
    sequence.push(Math.floor(Math.random() * 4));
  }

  function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 600); // duración más larga
  }

  async function playSequence() {
    inputEnabled = false;
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(res => setTimeout(res, 700));
      flash(buttons[sequence[i]]);
    }
    inputEnabled = true;
    userIndex = 0;
  }

  function handleClick(id) {
    if (!inputEnabled) return;

    flash(buttons[id]);

    if (id === sequence[userIndex]) {
      userIndex++;
      if (userIndex === sequence.length) {
        inputEnabled = false;
        setTimeout(() => {
          if (window.__adv?.finish) {
            window.__adv.finish();
          }
        }, 300);
      }
    } else {
      inputEnabled = false;
      setTimeout(playSequence, 800);
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => handleClick(Number(btn.dataset.id)));
  });

  setTimeout(playSequence, 500);
}

setupMemoryColors();