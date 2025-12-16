// archivo cargado como module por main.js
// este módulo debe crear la lógica del juego y, al completarse, llamar a window.__adv.finish({hint: 'texto'})

const symbols = ['♥','★','☕']; // 3 parejas, simple y romántico
const cards = symbols.concat(symbols);
shuffle(cards);

const board = document.getElementById('d01board');
let first = null, second = null, matches = 0;

cards.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.sym = s;
  el.dataset.idx = i;
  el.setAttribute('role','button');
  el.addEventListener('click', ()=> flipCard(el));
  board.appendChild(el);
});

function flipCard(el){
  if(el.classList.contains('open')) return;
  if(second) return; // esperando a reset
  el.classList.add('open');
  el.textContent = el.dataset.sym;
  if(!first) first = el;
  else {
    second = el;
    if(first.dataset.sym === second.dataset.sym){
      matches++;
      first=null; second=null;
      if(matches === symbols.length){
        // breve delay para que vea el último par
        setTimeout(()=> {
          // Llamamos a la función del host para indicar final
          if(window.__adv && typeof window.__adv.finish === 'function'){
            window.__adv.finish();
          } else {
            alert("¡Completado! Pista: La taza azul en la cocina.");
          }
        }, 500);
      }
    } else {
      setTimeout(()=> {
        first.classList.remove('open'); first.textContent = '';
        second.classList.remove('open'); second.textContent = '';
        first = null; second = null;
      }, 600);
    }
  }
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
}
