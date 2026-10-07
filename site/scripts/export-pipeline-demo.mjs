import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Export the built component, so the portable demo shares the site's behavior.
const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(siteRoot, 'dist');
const output = resolve(process.argv[2] || resolve(siteRoot, '../.preview/Pipeline1-interactive.html'));
const html = await readFile(resolve(dist, 'projects/stateful-evaluation/index.html'), 'utf8');
let component = html.match(/<section\b[^>]*class="pipeline-lab"[\s\S]*?<\/section>/)?.[0];
// Astro emits larger scripts as assets instead of inline modules. Embed either form.
const scriptBodies = await Promise.all([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map(async match => {
  const asset = match[1].match(/src="\/my_website\/([^\"]+)"/)?.[1];
  return asset ? readFile(resolve(dist, asset), 'utf8') : match[2];
}));
const scripts = scriptBodies.filter(script => script.includes('.pipeline-lab'));
if (!component || scripts.length !== 1) throw new Error('Build the site first; expected one PipelineLab component and script.');

const cssPaths = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="\/my_website\/([^\"]+)"[^>]*>/g)].map(match => match[1]);
if (!cssPaths.length) throw new Error('No built stylesheets found.');
let css = (await Promise.all(cssPaths.map(path => readFile(resolve(dist, path), 'utf8')))).join('\n');
const fonts = [...new Set([...css.matchAll(/url\(["']?\/my_website\/([^"')]+\.woff2)["']?\)/g)].map(match => match[1]))];
for (const font of fonts) {
  const data = (await readFile(resolve(dist, font))).toString('base64');
  css = css.replaceAll(`/my_website/${font}`, `data:font/woff2;base64,${data}`);
}
const diagram = (await readFile(resolve(dist, 'pipeline1-concept.svg'))).toString('base64');
component = component.replace('href="/my_website/pipeline1-concept.svg" download', `href="data:image/svg+xml;base64,${diagram}" download="pipeline1-concept.svg"`);
const document = `<!doctype html>
<html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pipeline1 — Interactive concept · Pei-Yu Tseng</title>
<style>${css}
body{padding:24px}main,.portable-heading{max-width:1160px;margin:auto}.portable-heading{display:flex;gap:20px;align-items:center;justify-content:space-between;padding:0 0 22px}.portable-heading h1{font-size:17px;letter-spacing:-.03em}.portable-heading p{font-size:11px;color:var(--muted);margin-top:6px}.portable-heading button{font-size:11px;padding:9px 13px;background:var(--surface);border:1px solid var(--line);border-radius:4px}.pipeline-lab{scroll-margin-top:20px}@media(max-width:540px){body{padding:12px}.portable-heading h1{font-size:14px}.portable-heading button{font-size:10px}.portable-heading p{font-size:10px}}
</style></head><body><header class="portable-heading"><div><h1>Pipeline1 / Interactive concept</h1><p>Pei-Yu Tseng · Penn State</p></div><button type="button" id="portable-theme">Use light theme</button></header><main>${component}</main>
<script type="module">${scripts[0]}</script>
<script>document.getElementById('portable-theme').addEventListener('click',function(){const light=document.documentElement.dataset.theme!=='light';document.documentElement.dataset.theme=light?'light':'dark';this.textContent=light?'Use dark theme':'Use light theme';});</script>
</body></html>`;
await mkdir(dirname(output), { recursive: true });
await writeFile(output, document);
console.log(`Standalone demo: ${output} (${Math.round(Buffer.byteLength(document) / 1024)} KiB)`);
