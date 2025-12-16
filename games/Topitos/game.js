(() => {
  const board = document.getElementById('d11board');
  const scoreEl = document.getElementById('d11score');
  const goal = 10;
  let score = 0;

  const holes = [];

  // crear 9 agujeros
  for(let i=0;i<9;i++){
    const h = document.createElement('div');
    h.className='hole';
    board.appendChild(h);
    holes.push(h);
  }

  scoreEl.textContent = score;

  function showGift(){
    const idx = Math.floor(Math.random()*holes.length);
    const hole = holes[idx];
    hole.textContent = '🎁';
    hole.classList.add('active');

    // desaparecer si no se hace clic
    const timeout = setTimeout(()=>{
      hole.textContent='';
      hole.classList.remove('active');
    }, 800);

    hole.onclick = ()=>{
      if(!hole.classList.contains('active')) return;
      score++;
      scoreEl.textContent = score;
      hole.textContent='';
      hole.classList.remove('active');
      clearTimeout(timeout);

      if(score>=goal){
        if(window.__adv?.finish) window.__adv.finish();
      }
    };
  }

  // mostrar regalos cada 700ms
  setInterval(showGift, 700);
})();
