import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvnPO2REN-46e1ONWBYMiEJze6AtZcDoM",
    authDomain: "calendari2025-f8b6b.firebaseapp.com",
    projectId: "calendari2025-f8b6b",
    storageBucket: "calendari2025-f8b6b.firebasestorage.app",
    messagingSenderId: "409158586206",
    appId: "1:409158586206:web:b63c10a856bef36bc0c9cf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Esta función se ejecuta cada vez que cambia el estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Si no hay usuario logueado, redirige al login
    window.location.href = "index.html";
  }
});

const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}

import { DAYS, CONFIG } from './days.js';

/* ---------- helpers ---------- */
const $ = sel => document.querySelector(sel);
const todayDate = () => { const d = new Date(); if(CONFIG.timezoneOffsetDays) d.setDate(d.getDate() + CONFIG.timezoneOffsetDays); return d.getDate(); };

/* ---------- estado local ---------- */
const opened = JSON.parse(localStorage.getItem('adv_opened') || '[]');

/* ---------- render calendario ---------- */
function renderCalendar(){
  const cal = $('#calendar');
  cal.innerHTML = '';
  for(let i=1;i<=24;i++){
    const day = DAYS[i] || {title: `Día ${i}`, gamePath: null, hint:''};
    const box = document.createElement('article');
    box.className = 'box';
    box.dataset.day = i;
    const isOpen = opened.includes(i);
    const accessible = isAccessible(i);
    if(!accessible) box.classList.add('locked');
    if(isOpen) box.classList.add('opened');
    box.innerHTML = `
      <div>
        <div class="num">Dia ${i}</div>
        <div class="title">${accessible ? escapeHtml(day.title) : ''}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn" data-action="info" ${accessible? '' : 'disabled'}>Info</button>
        <button class="btn primary ${accessible? '' : 'disabled'}"data-action="open">Obrir</button>
      </div>
    `;
    cal.appendChild(box);
  }
}

/* ---------- utilidades ---------- */
function escapeHtml(s){ return (s||'').toString().replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }
function isAccessible(day){
  if (!CONFIG.strictByDate) return true;

  const now = new Date();

  // Solo desbloquear automáticamente si estamos en diciembre
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1; // 1 = enero ... 12 = diciembre

  if (currentMonth !== 12) {
    return false; // ❌ NO es diciembre → ningún día está accesible
  }

  return currentDay >= day; // ✔️ sí estamos en diciembre → desbloqueo por día
}

function markOpened(day){
  if(!opened.includes(day)) {
    opened.push(day);
    localStorage.setItem('adv_opened', JSON.stringify(opened));
    renderCalendar();
  }
}

/* ---------- overlay y carga dinámica ---------- */
const overlay = $('#overlay');
const gameCard = $('#gameCard');
const gameContent = $('#gameContent');
const closeOverlay = $('#closeOverlay');

async function openDay(day){
  const dayCfg = DAYS[day];
  if(!dayCfg || !dayCfg.gamePath){
    showMessage("Este día aún no tiene contenido. Pronto habrá una sorpresa.");
    return;
  }

  // Carga HTML del juego (fetch) e inyecta
  showOverlay();
  gameContent.innerHTML = '<div class="loader">Cargando el reto...</div>';
  try{
    const res = await fetch(dayCfg.gamePath, {cache: "no-store"});
    if(!res.ok) throw new Error('No se pudo cargar el reto');
    const html = await res.text();
    // inyectamos el HTML del juego
    gameContent.innerHTML = html;

    // añadimos script del juego si existe (se espera que games/dayXX/game.js esté en la misma carpeta)
    const scriptPath = dayCfg.gamePath.replace('index.html','game.js');
    await loadModuleScript(scriptPath);

    // pasamos contexto ligero al juego: función global para finalizar
    window.__adv = {
      day,
      hint: dayCfg.hint || '',
      finish: (opts={})=>{
        const hintText = opts.hint || dayCfg.hint || "Busca el regalo en su lugar habitual.";
        showFinish(day, hintText);
        markOpened(day);
      }
    };
  } catch(err){
    console.error(err);
    gameContent.innerHTML = `<div class="loader">Error cargando el reto. Intenta más tarde.</div>`;
  }
}

function loadModuleScript(path){
  return new Promise((resolve, reject)=>{
    // si ya está cargado, resolver
    if(document.querySelector(`script[data-path="${path}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = path;
    s.type = 'module';
    s.dataset.path = path;
    s.onload = ()=> resolve();
    s.onerror = (e)=> reject(e);
    document.body.appendChild(s);
  });
}

function showOverlay(){
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden','false');
  // focus para accesibilidad
  setTimeout(()=> gameContent.focus(), 160);
}

function hideOverlay(){
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden','true');
  // limpiar contenido para liberar memoria
  gameContent.innerHTML = '';
  // remove global
  delete window.__adv;
}

function showMessage(text){
  // modal simple dentro del overlay
  showOverlay();
  gameContent.innerHTML = `<div style="padding:28px">${text}<div style="margin-top:14px"><button class="btn primary" onclick="document.getElementById('closeOverlay').click()">Acceptar</button></div></div>`;
}

/* ---------- final del juego ---------- */
function showFinish(day, hint){
  // muestra la pista romántica y opción de volver
  gameContent.innerHTML = `
    <div style="padding:18px;text-align:center">
      <h2>Molt bé! ❤️</h2>
      <b><p style="color:var(--muted);margin:12px 0">PREMI/PISTA: ${escapeHtml(hint)}</p>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
        <button class="btn" onclick="document.getElementById('closeOverlay').click()">Tornar al calendari</button>
      </div>
    </div>
  `;
}

/* ---------- eventos ---------- */
document.addEventListener('click', (ev)=>{
  const box = ev.target.closest('.box');
  if(box){
    const day = Number(box.dataset.day);
    if(ev.target && ev.target.dataset.action === 'open'){
      if(!isAccessible(day)){
        // pedir código maestro
        const code = prompt("Encara no es el dia — introdueix el codi secret si vols obrirlo:");
        if(code && code.trim().toLowerCase() === CONFIG.secretCode.toLowerCase()){
          openDay(day);
        } else {
          showMessage(`<h2>SORRY!</h2><h3>Encara no pots obrir el dia ${day} pitufa ;)</h3>`);
        }
      } else {
        openDay(day);
      }
    } else if(ev.target && ev.target.dataset.action === 'info'){
      if (!opened.includes(day)) {
        showMessage("Primer has de superar el joc abans de veure la informació pitufa ;)");
        return;
      }

      const info = DAYS[day] ? DAYS[day].title : `Día ${day}`;
      const hint = DAYS[day]?.hint || '';
      showMessage(`
        <h2>${escapeHtml(info)}</h2>
        <h3>PREMI/PISTA: <small style="color:var(--muted)">${escapeHtml(hint)}</small></h3>
      `);
    }
  }
});

// overlay cerrar
closeOverlay.addEventListener('click', hideOverlay);
$('#overlayBackdrop').addEventListener('click', hideOverlay);

/* ---------- init ---------- */
renderCalendar();
