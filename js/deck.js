// Deck navigation: builds (data-b), keyboard/clicker, view-transition slide changes, scroll-snap sync, HUD, light/dark, print mode, funnel dots.
(function(){
const deck=document.getElementById('deck');
const slides=[...document.querySelectorAll('.slide')];
const PRINT=/[?&]print/.test(location.search);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur=0, step=0, keyNav=false, t0=null, navTimer=null;
const TOTAL=10*60;

// --- funnel dots (slide 2) ---
(function(){const f=document.getElementById('field');if(!f)return;const NS='http://www.w3.org/2000/svg';
  let seed=11;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  const picks={14:0,57:1,96:2};const RUKA=40;
  for(let i=0;i<130;i++){const g=document.createElementNS(NS,'g');g.setAttribute('class','dot');
    let x=24+rnd()*440,y=24+rnd()*352;
    if(i===RUKA){x=300;y=230;g.classList.add('ruka');}
    g.style.setProperty('--x',x+'px');g.style.setProperty('--y',y+'px');
    if(i in picks){g.classList.add('pick');g.style.setProperty('--tx','520px');g.style.setProperty('--ty',(130+picks[i]*95)+'px');}
    const c=document.createElementNS(NS,'circle');c.setAttribute('r',i===RUKA?8:6);g.appendChild(c);
    if(i===RUKA){const t=document.createElementNS(NS,'text');t.setAttribute('x',16);t.setAttribute('y',7);t.textContent='Ruka';g.appendChild(t);}
    f.appendChild(g);}
})();

function builds(i){return Math.max(0,...[...slides[i].querySelectorAll('[data-b]')].map(e=>+e.dataset.b));}
function paint(i,k){const s=slides[i];
  s.querySelectorAll('[data-b]').forEach(e=>e.classList.toggle('shown',+e.dataset.b<=k));
  for(let n=1;n<=6;n++)s.classList.toggle('b'+n,n<=k);
  if(s.classList.contains('s-dilemma')){const r=s.querySelector('.ruka text');if(r)r.textContent=k>=1?'Ruka?':'Ruka';}
}
function activate(i){slides.forEach((s,j)=>s.classList.toggle('active',j===i));
  document.getElementById('progress').style.width=((i+1)/slides.length*100)+'%';hud();}
function go(i,mode){i=Math.max(0,Math.min(slides.length-1,i));
  const from=cur, k=mode==='end'?builds(i):0, el=slides[i];
  keyNav=true;clearTimeout(navTimer);navTimer=setTimeout(()=>keyNav=false,1200);
  const swap=()=>{cur=i;step=k;paint(i,step);activate(i);deck.scrollTo({top:el.offsetTop,behavior:'instant'});};
  if(reduce||i===from){swap();return;}
  // Fluid slide change: View Transitions crossfade + drift where supported, a quick CSS fade otherwise.
  document.documentElement.dataset.dir=i<from?'back':'fwd';
  if(document.startViewTransition){document.startViewTransition(swap);return;}
  deck.classList.add('fading');setTimeout(()=>{swap();requestAnimationFrame(()=>deck.classList.remove('fading'));},220);}
function next(){if(!t0)t0=Date.now();if(step<builds(cur)){step++;paint(cur,step);hud();}else if(cur<slides.length-1)go(cur+1,'start');}
function prev(){if(step>0){step--;paint(cur,step);hud();}else if(cur>0)go(cur-1,'end');}

// Manual scrolling (wheel, touch, trackpad): show the arrived slide fully built.
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>=.55){const i=slides.indexOf(e.target);
  if(i!==cur&&!keyNav){cur=i;step=builds(i);paint(i,step);activate(i);}}});},{root:deck,threshold:[.55]});

function hud(){const h=document.getElementById('hud');const el=t0?Math.floor((Date.now()-t0)/1000):0;
  h.textContent=`${cur+1}/${slides.length} · ${Math.floor(el/60)}:${String(el%60).padStart(2,'0')} · build ${step}/${builds(cur)}`;h.classList.toggle('late',el>TOTAL-30);}

// --- light/dark: follows the system until toggled (T key or corner button); print is always light ---
const root=document.documentElement, mq=matchMedia('(prefers-color-scheme: dark)');
const stored=()=>{try{return localStorage.getItem('deck-theme');}catch(e){return null;}};
function setTheme(t,save){root.dataset.theme=t;const b=document.getElementById('theme');
  if(b){b.setAttribute('aria-pressed',String(t==='dark'));b.title=t==='dark'?'Light mode (T)':'Dark mode (T)';}
  if(save){try{localStorage.setItem('deck-theme',t);}catch(e){}}}
function toggleTheme(){setTheme(root.dataset.theme==='dark'?'light':'dark',true);}
let printPrev=null;
if(PRINT)setTheme('light');else{setTheme(stored()||(mq.matches?'dark':'light'));
  mq.addEventListener('change',e=>{if(!stored())setTheme(e.matches?'dark':'light');});
  addEventListener('beforeprint',()=>{printPrev=root.dataset.theme;root.dataset.theme='light';});
  addEventListener('afterprint',()=>{if(printPrev)root.dataset.theme=printPrev;});
  const tb=document.getElementById('theme');if(tb)tb.addEventListener('click',e=>{e.stopPropagation();toggleTheme();tb.blur();});}

if(PRINT){document.body.classList.add('print');slides.forEach((s,i)=>{s.classList.add('active');paint(i,builds(i));});return;}

slides.forEach(s=>io.observe(s));
paint(0,0);activate(0);setInterval(hud,1000);

addEventListener('keydown',e=>{const k=e.key;if(e.metaKey||e.ctrlKey||e.altKey)return;
  if(['ArrowDown','ArrowRight','PageDown',' ','Enter'].includes(k)){e.preventDefault();next();}
  else if(['ArrowUp','ArrowLeft','PageUp','Backspace'].includes(k)){e.preventDefault();prev();}
  else if(k==='Home'){e.preventDefault();go(0,'start');}
  else if(k==='End'){e.preventDefault();go(slides.length-1,'end');}
  else if(k==='f'||k==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
  else if(k==='h'||k==='H'){document.getElementById('hud').classList.toggle('on');}
  else if(k==='t'||k==='T'){toggleTheme();}
  else if(k==='r'||k==='R'){t0=Date.now();hud();}
  else if(k==='b'||k==='B'||k==='.'){const b=document.getElementById('blank');b.style.display=b.style.display==='block'?'none':'block';}
  else if(k==='n'||k==='N'){alert(slides[cur].dataset.notes||'');}
});
// Click to advance (desktop pointers only); left edge goes back.
if(matchMedia('(pointer:fine)').matches)deck.addEventListener('click',e=>{(e.clientX<innerWidth*.2)?prev():next();});
})();
