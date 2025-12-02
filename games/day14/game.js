// Day14 connect dots
(() => {
  const c = document.getElementById('c14');
  const w = c.clientWidth, h = c.clientHeight;
  // simple fixed points making heart-like shape
  const pts = [{x:80,y:50},{x:120,y:30},{x:160,y:50},{x:140,y:90},{x:100,y:120},{x:60,y:90}];
  let seq = [];
  pts.forEach((p,i)=>{
    const d = document.createElement('div');
    d.className='dot';
    d.style.left = p.x+'px'; d.style.top = p.y+'px';
    d.dataset.i = i;
    d.addEventListener('click', ()=> {
      if(seq.includes(i)) return;
      seq.push(i);
      d.style.background = 'var(--accent-2)';
      if(seq.length === pts.length){
        // very simple check: if length ok, finish
        if(window.__adv && window.__adv.finish) window.__adv.finish();
      }
    });
    c.appendChild(d);
  });
})();
