// Day22 pattern 4 icons
(() => {
  const icons = ['👶🏻','🏠','💙','🐶'].sort(()=>Math.random()-0.5);
  const correct = ['💙','🏠','🐶','👶🏻']; // pattern to press
  const pad = document.getElementById('pad22');
  const seq = [];
  icons.forEach(ic=>{
    const b = document.createElement('button'); b.className='btnicon'; b.innerText = ic;
    b.addEventListener('click', ()=> {
      seq.push(ic);
      b.style.opacity = '.5';
      if(seq.length === correct.length){
        if(seq.join('') === correct.join('')){
          if(window.__adv && window.__adv.finish) window.__adv.finish();
        } else {
          alert('Casi però no amor, torna a provar 💫');
          seq.length = 0;
          document.querySelectorAll('.d22 .btnicon').forEach(x=> x.style.opacity = '1');
        }
      }
    });
    pad.appendChild(b);
  });
})();