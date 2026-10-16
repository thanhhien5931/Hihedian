// Full-page screenshots at desktop + mobile widths, using the locally installed Microsoft Edge.
// Usage: npm run screenshot [-- <page.html | url> ...]   (default: index.html)
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve, basename, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const targets = process.argv.slice(2);
if (targets.length === 0) targets.push('index.html');

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

mkdirSync('screenshots', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });

for (const target of targets) {
  const url = /^https?:/.test(target) ? target : pathToFileURL(resolve(target)).href;
  const name = /^https?:/.test(target)
    ? new URL(target).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home'
    : basename(target, extname(target));

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Load every lazy image (including ones in horizontal scrollers) before capture.
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
      await Promise.all([...document.images].map((img) => img.complete || img.decode().catch(() => {})));
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    // Reveal scroll-triggered content so the full-page capture shows everything.
    await page.evaluate(() => document.documentElement.classList.add('is-screenshot'));
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const file = `screenshots/${name}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${file}${overflow > 0 ? `  ⚠ horizontal overflow: ${overflow}px` : ''}`);
    await page.close();
  }
}

await browser.close();
