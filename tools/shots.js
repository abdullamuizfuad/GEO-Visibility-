// Renders each slide fully built (print mode, dark theme) to .check/pptx/NN.png at 1920x1080, for tools/make_pptx.py.
// Usage: node tools/shots.js && python3 tools/make_pptx.py
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const root = path.resolve(__dirname, '..');
  const out = path.join(root, '.check', 'pptx');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, colorScheme: 'dark' });
  await p.goto('file://' + path.join(root, 'index.html') + '?print&dark');
  await p.waitForTimeout(2000);
  const slides = await p.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    await slides[i].scrollIntoViewIfNeeded();
    await p.waitForTimeout(150);
    await slides[i].screenshot({ path: path.join(out, String(i + 1).padStart(2, '0') + '.png') });
  }
  // link boxes (slide 17 teaching tools) as fractions of the slide, for clickable areas in the PPTX
  const links = [];
  for (let i = 0; i < slides.length; i++) {
    await slides[i].scrollIntoViewIfNeeded();
    const r = await slides[i].evaluate(s => { const b = s.getBoundingClientRect();
      return [...s.querySelectorAll('a.tool')].map(a => { const q = a.getBoundingClientRect();
        return { href: a.href, x: (q.left - b.left) / b.width, y: (q.top - b.top) / b.height, w: q.width / b.width, h: q.height / b.height }; }); });
    r.forEach(l => links.push({ slide: i, ...l }));
  }
  fs.writeFileSync(path.join(out, 'links.json'), JSON.stringify(links, null, 1));
  console.log(slides.length + ' slides rendered to ' + out + '; ' + links.length + ' links');
  await b.close();
})();
