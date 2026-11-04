// Slide 4 "search simulation": two AI chats (EN + 中文) answer the same honeymoon question; three dots from a field of
// hotels near Malé fly into each shortlist; Ruka is never named. Self-running loop while the slide is active.
// ?print and prefers-reduced-motion render the final state statically. Renders into #searchsim (no other markup needed).
(function(){
const root=document.getElementById('searchsim');if(!root)return;
const PRINT=/[?&]print/.test(location.search);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const A='assets/';

const HOTELS={
  stone:{name:'Stone Hotels Dhiffushi',logo:'logo-stone.png',desc:'Dhiffushi · rooftop infinity pool, spa, private beach',x:20,y:30},
  arena:{name:'Arena Beach Hotel',logo:'logo-arena.png',desc:'Maafushi · private beach, 50 rooms',x:40,y:76},
  crystal:{name:'Crystal Sands',logo:'logo-crystal.png',desc:'',x:83,y:22}
};
const RUKA={x:66,y:58};
const LANGS=[
  {id:'en',label:'AI assistant · UK (English)',lang:'en',
   q:'cosy guesthouse near Malé for a honeymoon, not too expensive',
   intro:'Here are three cosy picks near Malé:',picks:['stone','arena','crystal']},
  {id:'zh',label:'AI assistant · China (中文)',lang:'zh-Hans',
   q:'我们是情侣，想找马尔代夫马累附近温馨又不太贵的民宿',
   intro:'为您推荐以下三家：',picks:['arena','crystal','stone']}
];
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

// ---------- markup ----------
const icoSearch='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>';
const icoCursor='<svg class="ss-cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2.5v17.2l4.6-4.3 3 6.6 3-1.4-3-6.4h6.1z"/></svg>';
const col=L=>`<div class="ss-col" data-l="${L.id}">
  <div class="ss-bar" lang="${L.lang}">${icoSearch}<span class="ss-q"><span class="ss-qt"></span><i class="ss-caret"></i></span>
    <span class="ss-go">Search${icoCursor}</span></div>
  <div class="ss-chat">
    <div class="ss-chat-h"><span class="ss-av"></span>${esc(L.label)}</div>
    <div class="ss-chat-b">
      <p class="ss-user" lang="${L.lang}">${esc(L.q)}</p>
      <div class="ss-load"><i></i><i></i><i></i></div>
      <div class="ss-ans"><span class="ss-av sm"></span><p class="ss-intro" lang="${L.lang}"></p></div>
      <ol class="ss-list">${L.picks.map((k,i)=>{const h=HOTELS[k];return `<li data-k="${k}">
        <span class="ss-n">${i+1}</span><span class="ss-slot"><img src="${A+h.logo}" alt=""></span>
        <span class="ss-meta"><b>${esc(h.name)}</b>${h.desc?`<small>${esc(h.desc)}</small>`:''}</span></li>`;}).join('')}</ol>
    </div>
  </div></div>`;

let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
let dots='';
for(let i=0;i<150;i++){let x,y,tries=0;
  do{x=3+rnd()*94;y=5+rnd()*90;tries++;}
  while(tries<40&&(Math.hypot((x-RUKA.x)/1.1,(y-RUKA.y)*.75)<11||Object.values(HOTELS).some(h=>Math.hypot(x-h.x,(y-h.y)*.6)<4.5)));
  dots+=`<i class="ss-dot" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--d:${(rnd()*1.2).toFixed(2)}s"></i>`;}
for(const k in HOTELS){const h=HOTELS[k];dots+=`<i class="ss-dot pick" data-k="${k}" style="left:${h.x}%;top:${h.y}%;--d:.3s"></i>`;}

root.classList.add('ss');
root.innerHTML=`<header class="ss-head"><span class="eyebrow">Simulation · modelled on our field test, 4 Nov 2026</span>
  <h2>Same question, asked in the UK and in China.</h2>
  <p class="ss-sub">They use completely different AI engines. The result is the same: <b>no Ruka.</b></p></header>
<div class="ss-main">${LANGS.map(col).join('')}
  <aside class="ss-side">
    <div class="ss-field"><div class="ss-cap"><span class="smallcaps">Places to stay near Malé</span><span class="ss-note">~150 · illustrative</span></div>
      <div class="ss-dots">${dots}<span class="ss-ruka" style="left:${RUKA.x}%;top:${RUKA.y}%"><img src="${A}logo-ruka-tile.png" alt=""><b>Ruka</b></span></div></div>
    <div class="ss-verdict">
      <div class="ss-score"><span class="ss-zero">0</span><span class="ss-zt">times <b>Ruka Maldives</b> was named</span></div>
      <div class="ss-thumbs"><img src="${A}baidu-couple.png" alt="Baidu answer, couple prompt"><img src="${A}google-ai.png" alt="Google AI Mode answer"><img src="${A}baidu-dhiffushi.png" alt="Baidu answer, Dhiffushi"></div>
      <p class="ss-tcap">Real answers, 4 Nov 2026 · Gemini · Google AI Mode · Baidu</p>
    </div>
  </aside>
  <div class="ss-why" role="note"><p><em>WHY</em> did both AIs skip <b>Ruka</b>?</p></div>
</div>`;

const cols=LANGS.map(L=>({L,el:root.querySelector(`.ss-col[data-l="${L.id}"]`)}));
cols.forEach(c=>{c.qt=c.el.querySelector('.ss-qt');c.intro=c.el.querySelector('.ss-intro');});
const STAGES=['s-type','s-cursor','s-press','s-sent','s-load','s-dim','s-zero','s-thumbs','s-why','s-final','s-out'];

// ---------- timeline ----------
let timers=[],anims=[],running=false;
const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
const stage=(c,on=true)=>root.classList.toggle(c,on);

function reset(){
  timers.forEach(clearTimeout);timers=[];anims.forEach(a=>{try{a.cancel();}catch(e){}});anims=[];
  root.querySelectorAll('.ss-fly').forEach(f=>f.remove());
  STAGES.forEach(s=>stage(s,false));
  cols.forEach(c=>{c.qt.textContent='';c.intro.textContent='';c.el.classList.remove('answered','sent','load');
    c.el.querySelectorAll('.ss-list li').forEach(li=>li.classList.remove('on'));});
  root.querySelectorAll('.ss-dot.chosen').forEach(d=>d.classList.remove('chosen'));
}
function final(){
  reset();running=false;
  cols.forEach(c=>{c.qt.textContent=c.L.q;c.intro.textContent=c.L.intro;c.el.classList.add('sent','answered');
    c.el.querySelectorAll('.ss-list li').forEach(li=>li.classList.add('on'));});
  root.querySelectorAll('.ss-dot.pick').forEach(d=>d.classList.add('chosen'));
  ['s-type','s-sent','s-dim','s-zero','s-thumbs','s-why','s-final'].forEach(s=>stage(s));
}
function typeInto(el,text,dur){const chars=[...text],t0=performance.now();
  const id=setInterval(()=>{const p=Math.min(1,(performance.now()-t0)/dur);el.textContent=chars.slice(0,Math.round(p*chars.length)).join('');
    if(p>=1)clearInterval(id);},35);timers.push(id);}

function fly(c,k,i){
  const dot=root.querySelector(`.ss-dot.pick[data-k="${k}"]`),li=c.el.querySelector(`.ss-list li[data-k="${k}"]`),slot=li.querySelector('.ss-slot');
  const R=root.getBoundingClientRect(),d=dot.getBoundingClientRect(),s=slot.getBoundingClientRect();
  if(!s.width||!d.width){li.classList.add('on');return;}
  const f=document.createElement('span');f.className='ss-fly';
  f.style.cssText=`left:${s.left-R.left}px;top:${s.top-R.top}px;width:${s.width}px;height:${s.height}px`;
  f.innerHTML=`<img src="${A+HOTELS[k].logo}" alt=""><i></i>`;root.appendChild(f);
  dot.classList.add('chosen');
  const dx=(d.left+d.width/2)-(s.left+s.width/2),dy=(d.top+d.height/2)-(s.top+s.height/2),sc=d.width/s.width;
  const lift=Math.min(-40,-Math.abs(dx)*.12);
  const a=f.animate([
    {transform:`translate(${dx}px,${dy}px) scale(${sc})`,borderRadius:'50%'},
    {transform:`translate(${dx*.45}px,${dy*.45+lift}px) scale(${Math.max(sc,.45)})`,borderRadius:'40%',offset:.55},
    {transform:'translate(0,0) scale(1)',borderRadius:getComputedStyle(slot).borderRadius}
  ],{duration:1000,easing:'cubic-bezier(.45,0,.2,1)',fill:'both'});
  const b=f.querySelector('i').animate([{opacity:1},{opacity:1,offset:.45},{opacity:0}],{duration:1000,fill:'both'});
  anims.push(a,b);
  a.onfinish=()=>{li.classList.add('on');f.remove();};
}

// Loop (ms): type 0.4–3.4s · cursor 3.5s · press 4.2s · loading 4.5–6.0s · EN answers 6.0s, 中文 6.5s ·
// dots fly 6.8–8.9s · Ruka dims 9.3s · red 0 at 9.8s · thumbnails 10.4s · WHY box 11.4s · hold to 16.4s · fade + restart at 17s.
function run(){
  reset();running=true;
  at(400,()=>{stage('s-type');cols.forEach(c=>typeInto(c.qt,c.L.q,2900));});
  at(3500,()=>stage('s-cursor'));
  at(4200,()=>stage('s-press'));
  at(4500,()=>{stage('s-press',false);stage('s-cursor',false);stage('s-sent');cols.forEach(c=>c.el.classList.add('sent','load'));stage('s-load');});
  cols.forEach((c,ci)=>{const t=6000+ci*500;
    at(t,()=>{c.el.classList.remove('load');c.el.classList.add('answered');typeInto(c.intro,c.L.intro,600);if(ci)stage('s-load',false);});
    c.L.picks.forEach((k,i)=>at(t+800+i*320,()=>fly(c,k,i)));});
  at(9300,()=>stage('s-dim'));
  at(9800,()=>stage('s-zero'));
  at(10400,()=>stage('s-thumbs'));
  at(11400,()=>stage('s-why'));
  at(16400,()=>stage('s-out'));
  at(17000,()=>{if(running)run();});
}

// ---------- activation ----------
const slide=root.closest('.slide');
const isActive=()=>root.hasAttribute('data-autostart')||!slide||slide.classList.contains('active');
function sync(){if(PRINT||reduce)return;
  if(isActive()&&!running)run();
  else if(!isActive()&&running){running=false;reset();}}
if(PRINT||reduce){final();}
else{
  if(slide)new MutationObserver(sync).observe(slide,{attributes:true,attributeFilter:['class']});
  sync();
  addEventListener('beforeprint',()=>{running=false;final();});
  addEventListener('afterprint',()=>{reset();running=false;sync();});
}
})();
