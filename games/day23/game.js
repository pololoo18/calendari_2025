// Day23 drag letters to form "TEQUIERO" (we'll do 7 letters minimal)
(() => {
  const word = 'TESTIMO'; // simplified fragment
  const slots = document.getElementById('slots23');
  const letters = document.getElementById('letters23');
  for(let i=0;i<word.length;i++){
    const s = document.createElement('div'); s.className='slot'; s.dataset.pos = i;
    slots.appendChild(s);
  }
  const arr = word.split('').sort(()=>Math.random()-0.5);
  arr.forEach(l=>{
    const d = document.createElement('div'); d.className='ltr'; d.innerText = l;
    d.draggable = true;
    d.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', l));
    letters.appendChild(d);
  });
  document.querySelectorAll('.d23 .slot').forEach(slot=>{
    slot.addEventListener('dragover', e=> e.preventDefault());
    slot.addEventListener('drop', e=>{
      e.preventDefault();
      const l = e.dataTransfer.getData('text/plain');
      slot.innerText = l;
      check();
    });
  });
  function check(){
    const got = [...document.querySelectorAll('.d23 .slot')].map(s=>s.innerText || '');
    if(got.join('') === word){
      if(window.__adv && window.__adv.finish) window.__adv.finish();
    }
  }
})();
