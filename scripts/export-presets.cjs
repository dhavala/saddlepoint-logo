// Run with Playwright installed: node scripts/export-presets.cjs
// Set BROWSER_EXECUTABLE when using an existing Chromium browser.
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs/promises');
const { pathToFileURL } = require('node:url');
(async () => {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    await page.waitForFunction(() => !document.querySelector('[data-export]').disabled);
    const defaults = await page.evaluate(() => ({size: $('logoSize').value, saddle: $('saddleInk').value, point: $('pointInk').value, dot: dot.value, transparent: $('transparent').checked}));
    if (JSON.stringify(defaults) !== JSON.stringify({size:'150', saddle:'50', point:'75', dot:'#17191b', transparent:true})) throw Error('Incorrect defaults');
    await page.evaluate(() => {
      const initialLogo = new DOMParser().parseFromString(makeSvg('symbol'), 'image/svg+xml').documentElement.getAttribute('height');
      $('textSize').value = 400;
      update();
      const text = new DOMParser().parseFromString(makeSvg('wordmark'), 'image/svg+xml').documentElement;
      const logo = new DOMParser().parseFromString(makeSvg('symbol'), 'image/svg+xml').documentElement;
      if (text.getAttribute('height') !== '688' || logo.getAttribute('height') !== initialLogo) throw Error('Independent text sizing failed');
      $('logoSize').value = 400;
      update();
      if (new DOMParser().parseFromString(makeSvg('symbol'), 'image/svg+xml').documentElement.getAttribute('height') !== '688') throw Error('Expanded logo range failed');
      applyPreset('default');
      if ($('textSize').value !== '100') throw Error('Text reset failed');
    });
    for (const preset of ['default', 'neon-lime']) {
      await page.selectOption('#preset', preset);
      const folder = path.join(root, 'presets', preset);
      await fs.mkdir(folder, {recursive:true});
      for (const [mode, name] of [['symbol','logo'], ['wordmark','text'], ['together','logo-text']]) {
        for (const format of ['svg','png']) {
          const content = await page.evaluate(async ({mode, format}) => {
            const svg = makeSvg(mode);
            return format === 'svg' ? svg : Array.from(new Uint8Array(await (await makePng(svg)).arrayBuffer()));
          }, {mode, format});
          await fs.writeFile(path.join(folder, `${name}.${format}`), format === 'svg' ? content : Buffer.from(content));
        }
      }
      console.log(`Exported ${preset}: logo, text, logo-text in SVG and PNG`);
    }
    await page.click('#reset');
    if (await page.inputValue('#logoSize') !== '150' || !await page.isChecked('#transparent')) throw Error('Reset failed');
    await page.setViewportSize({width:390,height:844});
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Mobile overflow');
    if (errors.length) throw Error(errors.join('\n'));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
