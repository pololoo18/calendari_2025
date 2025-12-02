// Day17 trivia
(() => {
  const qs = [
    {q:'De quina marca és mi moto?', opts:['Macbar','Macbor','Mocbor','Mocbar'], a:1},
    {q:'Millor plan?', opts:['Peli','Viaje','Cenita','Totes'], a:3},
    {q:'Quin està més rico?', opts:['Kinder','Oreo','Dinosaurus','Tú'], a:3},
    {q:'Qui és el bebé más gordo del mundo?', opts:['Tú (Pelele)','Yo (Polele)', 'Losh dosh'], a:2},
    {q:'Quina és LA nostra cançó?', opts:['Carry You Home - Alex Warren', 'Lienzo - Seastian Yatra', 'Ordinary - Alex Warren'], a:0},
    {q:'Quant t\'estimo?', opts:['Mucho','Mucho Mucho','Mucho infinito','Muchisimo infinito i más allá, ets l\'amor de la meva vida🩵'], a:3}
  ];

  let idx = 0;
  const qEl = document.getElementById('q17');
  const opts = document.getElementById('opts17');

  function render() {
    qEl.innerText = qs[idx].q;
    opts.innerHTML = '';

    qs[idx].opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.innerText = o;

      b.onclick = () => {
        // Correcta
        if (i === qs[idx].a) {
          b.innerText = '💖';
          b.style.background = '#ffe6ef';

          setTimeout(() => {
            idx++;
            if (idx >= qs.length) {
              if (window.__adv && window.__adv.finish)
                window.__adv.finish();
            } else {
              render();
            }
          }, 500);

        // Incorrecta
        } else {
          b.innerText = '❌';
          b.style.background = '#fdd';
          b.style.borderColor = '#f99';

          // Reset para permitir otro intento
          setTimeout(() => {
            b.innerText = o;
            b.style.background = '';
            b.style.borderColor = '';
          }, 650);
        }
      };

      opts.appendChild(b);
    });
  }

  render();
})();
