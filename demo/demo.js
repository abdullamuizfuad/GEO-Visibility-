// Demo flow: pick traveller -> prefilled prompt -> Search -> streamed shortlist (no Ruka)
// -> "Watch the screen" -> Search again -> after state. All wording lives in data.js.
const $ = id => document.getElementById(id);
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => RM ? Promise.resolve() : new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let persona = null, run = 0;

// Static copy
for (const k of ['title', 'sub', 'kicker', 'h1', 'intro', 'hint', 'label', 'stopH', 'stopP', 'note']) $(k).textContent = COPY[k];
$('search').textContent = COPY.search; $('again').textContent = COPY.again; $('restart').textContent = COPY.restart;

// Theme toggle (follows the system until the viewer picks one)
const root = document.documentElement;
const isDark = () => (root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
function paintTheme() {
  const d = isDark();
  $('theme').setAttribute('aria-pressed', d);
  $('theme').title = d ? 'Switch to light mode' : 'Switch to dark mode';
  document.querySelector('meta[name=theme-color]').content = d ? '#0B332D' : '#F6F1EA';
}
$('theme').onclick = () => {
  const t = isDark() ? 'light' : 'dark'; root.dataset.theme = t;
  try { localStorage.setItem('ruka-theme', t); } catch (e) {}
  paintTheme();
};
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', paintTheme);
paintTheme();

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id));
  window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
}

// Persona buttons
PERSONAS.forEach(p => {
  const b = document.createElement('button');
  b.type = 'button'; b.dataset.id = p.id;
  b.innerHTML = `<span class="e" aria-hidden="true">${p.e}</span><b>${esc(p.t)}</b><span>${esc(p.d)}</span>`;
  b.onclick = () => pick(p);
  $('personas').appendChild(b);
});

function pick(p) {
  persona = p; run++;
  $('q').value = p.q;
  $('zh').textContent = p.zh ? '中文: ' + p.zh : ''; $('zh').hidden = !p.zh;
  $('before').innerHTML = ''; $('after').innerHTML = '';
  for (const id of ['stop', 'again', 'after', 'restart']) $(id).hidden = true;
  $('search').disabled = false; $('q').disabled = false;
  show('s-ai');
}

async function stream(el, text, my) {
  if (RM) { el.textContent = text; return; }
  el.textContent = ''; el.classList.add('caret');
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (my !== run) return;
    el.textContent += (i ? ' ' : '') + words[i];
    await wait(38);
  }
  el.classList.remove('caret');
}

function shimmer(box) {
  const s = document.createElement('div'); s.className = 'shimmer';
  s.innerHTML = `<small>${esc(COPY.loading)}</small><i></i><i></i><i class="short"></i>`;
  box.appendChild(s); return s;
}

function item(key, i, why) {
  const pl = PLACES[key];
  const li = document.createElement('li');
  li.className = 'item' + (pl.ruka ? ' ruka' : '');
  li.innerHTML = `<span class="n">${i + 1}</span><div><b>${esc(pl.n)}</b><em>${esc(pl.where)}</em>` +
    `<p>${esc(why || pl.why)}</p><div class="src" aria-label="${esc(COPY.sourcesLabel)}">` +
    pl.src.map(s => `<span>${esc(s)}</span>`).join('') + `</div></div>`;
  return li;
}

async function answer(box, lead, keys, my, extra) {
  box.innerHTML = '';
  const sh = shimmer(box);
  await wait(1300); if (my !== run) return false;
  sh.remove();
  const p = document.createElement('p'); p.className = 'lead'; box.appendChild(p);
  await stream(p, lead, my); if (my !== run) return false;
  const ol = document.createElement('ol'); ol.className = 'list'; box.appendChild(ol);
  for (let i = 0; i < keys.length; i++) {
    const li = item(keys[i], i, PLACES[keys[i]].ruka ? persona.rukaWhy : '');
    ol.appendChild(li);
    await wait(40); li.classList.add('on'); await wait(420);
    if (my !== run) return false;
  }
  if (extra) { box.appendChild(extra); await wait(40); extra.classList.add('on'); }
  return true;
}

$('form').onsubmit = async e => {
  e.preventDefault();
  if (!persona || $('search').disabled) return;
  const my = ++run;
  $('search').disabled = true; $('q').disabled = true;
  for (const id of ['stop', 'again', 'after', 'restart']) $(id).hidden = true;
  const ok = await answer($('before'), persona.lead, persona.before, my);
  if (!ok) return;
  await wait(500);
  $('stop').hidden = false;
  if (navigator.vibrate) try { navigator.vibrate(20); } catch (e) {}
  await wait(600);
  $('again').hidden = false;
};

$('again').onclick = async () => {
  const my = ++run;
  $('again').hidden = true;
  const box = $('after'); box.hidden = false; box.innerHTML = '';
  const head = document.createElement('div'); head.className = 'afterhead';
  head.innerHTML = `<div class="label"><span class="spark" aria-hidden="true"></span>${esc(COPY.label)}</div>` +
    `<span class="kicker">${esc(COPY.afterKicker)}</span>` +
    `<div class="fixes" aria-label="${esc(COPY.fixesLabel)}">` +
    FIXES.map(f => `<span title="${esc(f.t)}"><b>${esc(f.p)}</b> ${esc(f.t)}</span>`).join('') + `</div>` +
    `<div class="qecho">${esc(persona.q)}</div>`;
  box.appendChild(head);
  const body = document.createElement('div'); body.className = 'answer'; box.appendChild(body);
  box.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
  let extra = null;
  if (persona.lesson) { extra = document.createElement('div'); extra.className = 'lesson'; extra.textContent = persona.lesson; }
  const ok = await answer(body, persona.afterLead, persona.after, my, extra);
  if (!ok) return;
  box.classList.add('done');
  $('restart').hidden = false;
};

$('restart').onclick = () => { run++; persona = null; show('s-pick'); };
