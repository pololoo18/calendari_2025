// Day18 click 3 clues
(() => {
  const grid = document.getElementById('g18');
  let clicks=0;
  for(let i=0;i<4;i++){
    const c = document.createElement('div'); c.className='cell'; c.innerText = '🔍';
    c.addEventListener('click', ()=>{
      if(c.dataset.done) return;
      c.dataset.done = '1';
      c.style.opacity = '.5';
      clicks++;
      if(clicks===3){
        if(window.__adv && window.__adv.finish) window.__adv.finish();
      }
    });
    grid.appendChild(c);
  }
})();
