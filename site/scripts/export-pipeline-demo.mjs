import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Export the complete research story, including its context, comparison, and technical details.
const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(siteRoot, 'dist');
const output = resolve(process.argv[2] || resolve(siteRoot, '../.preview/Test-environments.html'));
const html = await readFile(resolve(dist, 'projects/stateful-evaluation/index.html'), 'utf8');
let component = html.match(/<div\b[^>]*class="environment-study"[\s\S]*?<!-- End of portable research story -->/)?.[0];
if (!component) throw new Error('Build the site first; expected the complete test-environment research story.');

// Keep the explanation animation identical in the website and offline story.
const scriptBodies = await Promise.all([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map(async match => {
  const asset = match[1].match(/src="\/my_website\/([^\"]+)"/)?.[1];
  return asset ? readFile(resolve(dist, asset), 'utf8') : match[2];
}));
const selectors = ['.service-comparison'];
const scripts = [...new Set(scriptBodies.filter(script => selectors.some(selector => script.includes(selector))))];
for (const selector of selectors) {
  if (scripts.filter(script => script.includes(selector)).length !== 1) throw new Error(`Expected one explanation script for ${selector}.`);
}
// A nested Astro component may emit its script inside the extracted story.
// Remove that tag before adding the self-contained module once below.
component = component.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

const cssPaths = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="\/my_website\/([^\"]+)"[^>]*>/g)].map(match => match[1]);
if (!cssPaths.length) throw new Error('No built stylesheets found.');
let css = (await Promise.all(cssPaths.map(path => readFile(resolve(dist, path), 'utf8')))).join('\n');
const fonts = [...new Set([...css.matchAll(/url\(["']?\/my_website\/([^"')]+\.woff2)["']?\)/g)].map(match => match[1]))];
for (const font of fonts) {
  const data = (await readFile(resolve(dist, font))).toString('base64');
  css = css.replaceAll(`/my_website/${font}`, `data:font/woff2;base64,${data}`);
}
const diagram = (await readFile(resolve(dist, 'pipeline1-concept.svg'))).toString('base64');
component = component.replace('href="/my_website/pipeline1-concept.svg" download', `href="data:image/svg+xml;base64,${diagram}" download="test-environments-overview.svg"`);
const document = `<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI-built test environments · Pei-Yu Tseng</title>
<style>${css}
body{padding:24px}main,.portable-heading{max-width:1160px;margin:auto}.portable-heading{display:flex;gap:20px;align-items:center;justify-content:space-between;padding:0 0 22px}.portable-heading .portable-title{font-size:17px;letter-spacing:-.03em}.portable-heading p{font-size:11px;color:var(--muted);margin-top:6px}.portable-heading button{font-size:11px;padding:9px 13px;background:var(--surface);border:1px solid var(--line);border-radius:4px}.environment-study{padding-block:15px}.approach-section{scroll-margin-top:20px}@media(max-width:540px){body{padding:12px}.portable-heading .portable-title{font-size:14px}.portable-heading button{font-size:10px}.portable-heading p{font-size:10px}}
</style></head><body><header class="portable-heading"><div><p class="portable-title">Research / Pei-Yu Tseng</p><p>Penn State · Ongoing research</p></div><button type="button" id="portable-theme" hidden>Use light theme</button></header><main>${component}</main>
${scripts.map(script => `<script type="module">${script}</script>`).join('\n')}
<script>document.getElementById('portable-theme').hidden=false;document.getElementById('portable-theme').addEventListener('click',function(){const light=document.documentElement.dataset.theme!=='light';document.documentElement.dataset.theme=light?'light':'dark';this.textContent=light?'Use dark theme':'Use light theme';});</script>
</body></html>`;
await mkdir(dirname(output), { recursive: true });
await writeFile(output, document);
console.log(`Standalone demo: ${output} (${Math.round(Buffer.byteLength(document) / 1024)} KiB)`);
