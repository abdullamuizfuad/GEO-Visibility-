// One-command check: renders every slide (fully built), rebuilds slides.pdf,
// smoke-tests the phone demo and checks the phone layout for sideways overflow.
// Usage:  node tools/check.js [outDir]      (needs Playwright + Chromium)
// Screenshots land in outDir (default: ./.check, git-ignored).
const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const out = path.resolve(process.argv[2] || path.join(root, '.check'));
fs.mkdirSync(out, { recursive: true });
const url = f => 'file://' + path.join(root, f);

(async () => {
  const browser = await chromium.launch();
  const problems = [];

  // 1. Slides at 1920x1080, each at its final build
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => problems.push('deck: ' + e.message));
  await page.goto(url('index.html'));
  await page.waitForTimeout(1000);
  const n = await page.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 0; i < n; i++) {
    const builds = await page.evaluate(i => Math.max(0, ...[...document.querySelectorAll('.slide')[i]
      .querySelectorAll('[data-b]')].map(e => +e.dataset.b)), i);
    for (let k = 0; k < builds; k++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(250); }
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, '0')}.png`) });
    // slide 4's search animation treats the first key press as 'skip to end'; finish it first so navigation stays in step
    await page.evaluate(() => window.searchSimSkip && window.searchSimSkip());
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
  }

  // 2. PDF backup
  const pdf = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  // Dark PDF: screen media so the dark tokens apply; ?print&dark shows every build in the dark theme.
  await pdf.emulateMedia({ media: 'screen', colorScheme: 'dark' });
  await pdf.goto(url('index.html') + '?print&dark');
  await pdf.waitForTimeout(1500);
  await pdf.pdf({ path: path.join(root, 'slides.pdf'), width: '1920px', height: '1080px', printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 } });

  // 3. Phone layout of the deck
  const phone = await browser.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 1 });
  const m = await phone.newPage();
  m.on('pageerror', e => problems.push('deck (phone): ' + e.message));
  await m.goto(url('index.html'));
  await m.waitForTimeout(800);
  await m.screenshot({ path: path.join(out, 'phone-cover.png') });
  if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) problems.push('deck (phone): horizontal overflow');

  // 4. Phone demo: couple (Ruka reaches #1) and dive couple (Ruka not a fit), plus dark mode
  const dark = await browser.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 1, colorScheme: 'dark' });
  for (const [idx, name, ctx] of [[0, 'couple', phone], [3, 'dive', phone], [0, 'couple-dark', dark]]) {
    const d = await ctx.newPage();
    d.on('pageerror', e => problems.push(`demo ${name}: ` + e.message));
    await d.goto(url('demo/index.html'));
    await d.click(`#personas button:nth-child(${idx + 1})`);
    await d.click('#search');
    await d.waitForSelector('#again', { state: 'visible', timeout: 20000 });
    if (await d.locator('#before .item.ruka').count()) problems.push(`demo ${name}: Ruka shown before the fixes`);
    await d.click('#again');
    await d.waitForSelector('#after.done', { state: 'visible', timeout: 20000 });
    await d.waitForTimeout(700);
    await d.screenshot({ path: path.join(out, `demo-${name}.png`), fullPage: true });
    await d.setViewportSize({ width: 320, height: 640 });
    if (await d.evaluate(() => document.documentElement.scrollWidth > innerWidth)) problems.push(`demo ${name}: horizontal overflow at 320px`);
    await d.close();
  }

  await browser.close();
  console.log(`${n} slides rendered to ${out}; slides.pdf rebuilt.`);
  console.log(problems.length ? 'PROBLEMS:\n- ' + problems.join('\n- ') : 'No errors.');
  process.exitCode = problems.length ? 1 : 0;
})();
