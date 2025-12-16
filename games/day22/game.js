// Day16 drag flowers
(() => {
  const flowers = ['🌹','🌼','🌷'];
  const tray = document.getElementById('tray16');
  const vase = document.getElementById('vase16');
  let placed = 0;
  flowers.forEach((f,i)=>{
    const el = document.createElement('div'); el.className='flower'; el.innerText = f;
    el.draggable = true;
    el.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', f));
    tray.appendChild(el);
  });
  vase.addEventListener('dragover', e=> e.preventDefault());
  vase.addEventListener('drop', e=>{
    e.preventDefault();
    const v = e.dataTransfer.getData('text/plain');
    const s = document.createElement('div'); s.style.margin='4px'; s.innerText = v;
    vase.appendChild(s);
    placed++;
    if(placed >= 3){
      if(window.__adv && window.__adv.finish) window.__adv.finish();
    }
  });
})();
