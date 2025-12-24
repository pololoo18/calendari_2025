(() => {
  const canvas = document.getElementById('fireCanvas');
  const ctx = canvas.getContext('2d');
  const countEl = document.getElementById('fireCount');

  let fireworks = [];
  let count = 0;
  const target = 10;

  class Particle {
    constructor(x,y,color){
      this.x = x;
      this.y = y;
      this.vx = (Math.random()-0.5)*4;
      this.vy = (Math.random()-1.5)*4;
      this.alpha = 1;
      this.color = color;
      this.size = 2 + Math.random()*2;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // gravedad ligera
      this.alpha -= 0.02;
    }
    draw(ctx){
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function launchFirework(x,y){
    const colors = ['#ff4d4d','#4dff88','#4da6ff','#ffff4d','#ff99ff'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    for(let i=0;i<30;i++){
      fireworks.push(new Particle(x,y,color));
    }
    count++;
    countEl.innerText = count;
    if(count >= target){
      setTimeout(()=>{
        if(window.__adv?.finish) window.__adv.finish({});
        else alert("¡Feliz Navidad! 🎁✨");
      },300);
    }
  }

  function animate(){
    ctx.fillStyle = 'rgba(0,0,34,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    fireworks.forEach((p,i)=>{
      p.update();
      p.draw(ctx);
      if(p.alpha<=0) fireworks.splice(i,1);
    });
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    launchFirework(x,y);
  });

  animate();
})();
