(() => {
  const board = document.getElementById('p09board');
  const images = [1,2,3,4,5,6]; // nombres de archivos
  const order = [...images].sort(()=>Math.random()-0.5);
  let placed = [];

  order.forEach(val => {
    const d = document.createElement('div');
    d.className='piece';
    d.dataset.val = val;

    const img = document.createElement('img');
    img.src = `games/day09/${val}.jpg`; // ruta de la imagen
    img.alt = `${val}`;
    d.appendChild(img);

    d.addEventListener('click', ()=> {
      if(placed.includes(val)) return;
      placed.push(val);
      d.style.opacity = '0.4';
      check();
    });

    board.appendChild(d);
  });

  function check(){
    if(placed.length<6) return;
    if(placed.join('') === '123456'){
      setTimeout(()=> {
        if(window.__adv && window.__adv.finish){
          window.__adv.finish();
        }
      }, 300);
    } else {
      setTimeout(()=> {
        alert('Casi amor, torna a intentar-ho 💕');
        placed = [];
        document.querySelectorAll('.d09 .piece').forEach(p=>p.style.opacity='1');
      }, 200);
    }
  }
})();
