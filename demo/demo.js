// Demo flow: persona -> AI shortlist -> fix Ruka -> re-run -> wrap-up. Data lives in data.js.
let persona=null, fixed=new Set();
const $=id=>document.getElementById(id);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function go(n){document.querySelectorAll('.screen').forEach((s,i)=>s.classList.toggle('on',i===n));
  const st=[0,0,1,2,3][n]; document.querySelectorAll('.steps i').forEach((x,i)=>x.classList.toggle('on',i<=st));
  window.scrollTo({top:0,behavior:'smooth'});}
for(const k in P){const b=document.createElement('button');b.innerHTML=`<span class="e">${P[k].e}</span><b>${P[k].t}</b><span>${P[k].d}</span>`;b.onclick=()=>start(k);$('personas').appendChild(b);}
async function typeIn(el,text){el.textContent="";for(const ch of text){el.textContent+=ch;await wait(14);}}
async function think(el,lines){el.innerHTML="";for(const l of lines){const d=document.createElement('div');d.textContent=l;el.appendChild(d);await wait(60);d.classList.add('on');await wait(520);}}
function card(n,name,info,ruka){const d=document.createElement('div');d.className='gh'+(ruka?' ruka':'');d.innerHTML=`<span class="n">${n}</span><div><b>${name}</b><small>${info}</small></div>`;return d;}
async function reveal(el,cards){el.innerHTML="";for(const c of cards){el.appendChild(c);await wait(60);c.classList.add('on');await wait(380);}}
function msg(html,cls){const m=document.createElement('div');m.className=cls||'missing on';m.innerHTML=html;return m;}
async function start(k){persona=P[k];fixed.clear();renderFixes();go(1);
  $('res1').innerHTML="";$('think1').innerHTML="";$('miss1').classList.remove('on');$('q1').style.display='none';$('toFix').style.display='none';
  await typeIn($('prompt1'),persona.q);
  await think($('think1'),["Read guesthouse and hotel listings across the atolls","Matched your needs against listed facts","Checked reviews & cross-checked identities","Kept only options it could verify"]);
  await reveal($('res1'),persona.comp.map((c,i)=>card(i+1,c[0],c[1])));
  await wait(400);$('miss1').classList.add('on');await wait(700);$('q1').style.display='block';$('toFix').style.display='block';}
$('toFix').onclick=()=>go(2);
function renderFixes(){$('fixes').innerHTML="";FIX.forEach((f,i)=>{const d=document.createElement('div');d.className='fix'+(fixed.has(i)?' done':'');
  d.innerHTML=`<span class="tag">${f.tag}</span><h3>${f.h}</h3><div class="before">${f.b}</div><div class="after">${f.a}</div><button>${fixed.has(i)?'Fixed ✓':f.btn}</button>`;
  d.querySelector('button').onclick=()=>{fixed.has(i)?fixed.delete(i):fixed.add(i);renderFixes();if(navigator.vibrate)navigator.vibrate(15);};$('fixes').appendChild(d);});
  const n=fixed.size;$('mbar').style.width=(8+n*23)+'%';$('mval').textContent=["Low","Weak","Fair","Good","Strong"][n];$('rerun').disabled=n===0;}
$('rerun').onclick=async()=>{go(3);const n=fixed.size;const R=$('res2');R.innerHTML="";$('think2').innerHTML="";$('toMap').style.display='none';
  await typeIn($('prompt2'),persona.q);
  await think($('think2'),["Read guesthouse and hotel listings across the atolls","Found consistent facts about Ruka Maldives","Cross-checked Ruka on its website, Google & booking sites"]);
  const comp=persona.comp.map(c=>card(0,c[0],c[1]));
  const r=card(0,"Ruka Maldives, Dhiffushi","Why: "+persona.why,true);
  let list, after=[];
  if(n<2){list=comp;after.push(msg(`<b>Ruka is still not shortlisted.</b><p style="margin:6px 0 0">One fix isn't enough. The AI still can't verify Ruka. Go back and fix more.</p>`));}
  else if(persona.rank===0){list=comp;after.push(msg(`<b>Ruka is now visible… but not for this traveller.</b><p style="margin:6px 0 0">${persona.why} <br><br><b>Lesson:</b> visibility can't fix a poor fit. Positioning means choosing the segments you <i>can</i> win. Try the Beach couple.</p>`,'missing on'));}
  else if(n<4){list=[comp[0],comp[1],r];r.querySelector('small').textContent=`Partly verified: ${n} of 4 problems fixed. Fix all four to move up.`;}
  else{list=comp.slice(0,2);list.splice(persona.rank-1,0,r);}
  list.forEach((c,i)=>c.querySelector('.n').textContent=i+1);
  await reveal(R,list);after.forEach(a=>R.appendChild(a));
  if(n<4){const b=document.createElement('button');b.className='btn alt';b.textContent=n<2?'← Back to fixes':'← Fix the rest';b.onclick=()=>go(2);R.appendChild(b);}
  if(n>=2)$('toMap').style.display='block';
};
$('toMap').onclick=()=>go(4);
$('again').onclick=()=>go(0);
