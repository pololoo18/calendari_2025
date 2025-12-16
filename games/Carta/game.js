// Day15 order fragments
(() => {
  const phrases = [["t'estimo","bebe","gordisima","ets","la","millor","del","món"],
    ["vull","estar","amb","tu","per","sempre","amor"],
    ["em","fas","la","persona","més","feliç","del","món"],
    ["cada","dia","al","teu","costat","és","un","regal"]];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const arr = phrase.slice().sort(()=>Math.random()-0.5);
  const cont = document.getElementById('b15');
  const chosenArea = document.getElementById('chosen15');

  arr.forEach(w=>{
    const e = document.createElement('div');
    e.className='blk';
    e.innerText = w;

    e.addEventListener('click', ()=> {
      // Si ya está seleccionada → ignoramos (se deselecciona desde abajo)
      if(e.dataset.sel) return;

      // Marcar como seleccionada
      e.dataset.sel = '1';
      e.style.opacity = '.45';

      // Crear fragmento seleccionado
      const span = document.createElement('span');
      span.innerText = w + ' ';
      span.dataset.src = w;
      span.className = 'selSpan';

      // 🔥 Nueva función: deseleccionar desde abajo
      span.addEventListener('click', () => {
        // Remover selección visual
        delete e.dataset.sel;
        e.style.opacity = '1';

        // Quitar span
        span.remove();
      });

      chosenArea.appendChild(span);
    });

    cont.appendChild(e);
  });

  document.getElementById('check15').addEventListener('click', ()=>{
    const chosen = [...document.querySelectorAll('.selSpan')].map(s=>s.dataset.src);
    if(chosen.join(' ') === phrase.join(' ')){
      if(window.__adv && window.__adv.finish)
        window.__adv.finish();
    } else {
      alert('Aún no es la frase correcta, sigue con cariño.');
    }
  });
})();
