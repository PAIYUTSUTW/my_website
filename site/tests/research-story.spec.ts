import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const route = 'projects/stateful-evaluation/';

test('research story leads with environment generation and explains the testing tradeoffs', async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('h1')).toContainText('AI-built test environments');
  await expect(page.locator('.study-context')).toContainText('automated sequence of security actions');
  await expect(page.getByRole('table')).toBeVisible();
  const mainText = await page.locator('main').innerText();
  expect(mainText.indexOf('THE APPROACH')).toBeLessThan(mainText.indexOf('THE TESTING GAP'));
  await expect(page.locator('.playbook-test-comparison')).toHaveCount(0);
  expect(mainText).not.toMatch(/software mock|Pipeline1|MOCK 0\d|Watch the replacement/i);
  await expect(page.getByRole('group', { name: 'Testing with a real service', exact: true })).toContainText('Real service');
  await expect(page.getByRole('group', { name: 'Testing with a generated environment' })).toContainText('Built by our AI agent');
  await expect(page.locator('.comparison-context')).toContainText('existing security automation platform and service connector');
  await expect(page.locator('.contribution-section')).toContainText('design goals');
  await page.getByRole('link', { name: 'See the approach' }).click();
  await expect(page).toHaveURL(/#concept-demo$/);
});

test('technical detail is optional and works from the keyboard', async ({ page }) => {
  await page.goto(route);
  const summary = page.locator('.technical-details summary');
  const content = page.locator('.technical-content');
  await expect(content).toBeHidden();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(content).toBeVisible();
  await expect(content).toContainText('Pipeline1 is the internal name');
  await expect(content).toContainText('unmodified service connector');
  await page.keyboard.press('Enter');
  await expect(content).toBeHidden();
  const diagram = await page.request.get('http://localhost:4321/my_website/pipeline1-concept.svg');
  expect(diagram.ok()).toBe(true);
  expect(await diagram.text()).toContain('AI-built test environments');
  expect(await diagram.text()).not.toMatch(/software mock|Pipeline1/);
});

test('research story is accessible in both themes with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await page.locator('.technical-details summary').click();
    const scan = await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(scan.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('the complete exported story works offline without JavaScript', async ({ browser }, testInfo) => {
  const output = testInfo.outputPath('test-environments.html');
  execFileSync(process.execPath, ['scripts/export-pipeline-demo.mjs', output]);
  const context = await browser.newContext({ offline: true, javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  const requests: string[] = [];
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  try {
    await page.goto(pathToFileURL(output).href);
    await expect(page.locator('h1')).toContainText('AI-built test environments');
    await expect(page.getByRole('table')).toContainText('Run against real services');
    await expect(page.locator('.generated-path')).toContainText('Generated service environment');
    await expect(page.locator('.contribution-section')).toContainText('Ongoing research');
    await page.locator('summary').click();
    await expect(page.locator('.technical-content')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download the overview diagram' })).toHaveAttribute('href', /^data:image\/svg\+xml;base64,/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(requests).toEqual([]);
  } finally { await context.close(); }
});

test('explanation shows the service, agent generation, then redirected calls and supports pause', async ({ page }) => {
  await page.clock.install();
  await page.goto(`${route}#service-visual`);
  const figure = page.locator('.service-comparison');
  const workflow = await figure.locator('.workflow-node').innerText();
  await figure.getByRole('button', { name: 'Play explanation' }).click();
  await expect(figure).toHaveAttribute('data-stage', 'service');
  await expect(figure).toHaveAttribute('data-playing', 'true');
  await page.clock.fastForward(4100);
  await expect(figure).toHaveAttribute('data-stage', 'build');
  await expect(figure.locator('[data-narration]')).toContainText('reads connector code');
  await figure.getByRole('button', { name: 'Pause explanation' }).click();
  await page.clock.fastForward(10000);
  await expect(figure).toHaveAttribute('data-stage', 'build');
  await expect(figure).toHaveAttribute('data-playing', 'false');
  await figure.getByRole('button', { name: 'Continue explanation' }).click();
  await page.clock.fastForward(4100);
  await expect(figure).toHaveAttribute('data-stage', 'test');
  await expect(figure.locator('[data-narration]')).toContainText('same playbook');
  await page.clock.fastForward(4100);
  await expect(figure).toHaveAttribute('data-playing', 'false');
  await expect(figure.getByRole('button', { name: 'Replay explanation' })).toBeVisible();
  expect(await figure.locator('.workflow-node').innerText()).toBe(workflow);
  await figure.getByRole('button', { name: 'Replay explanation' }).click();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(figure).toHaveAttribute('data-playing', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(figure).toHaveAttribute('data-stage', 'test');
  await expect(figure.locator('[data-explain]')).toBeHidden();
});

test('the exported explanation plays offline and respects reduced motion', async ({ browser }, testInfo) => {
  const output = testInfo.outputPath('animated-test-environments.html');
  execFileSync(process.execPath, ['scripts/export-pipeline-demo.mjs', output]);
  const context = await browser.newContext({ offline: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors: string[] = [], requests: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  try {
    await page.clock.install();
    await page.goto(pathToFileURL(output).href);
    const figure = page.locator('.service-comparison');
    await figure.getByRole('button', { name: 'Play explanation' }).click();
    await page.clock.fastForward(4100);
    await expect(figure).toHaveAttribute('data-stage', 'build');
    await page.clock.fastForward(4100);
    await expect(figure).toHaveAttribute('data-stage', 'test');
    await page.clock.fastForward(4100);
    await expect(figure).toHaveAttribute('data-playing', 'false');
    await page.getByRole('button', { name: 'Use light theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(figure.locator('[data-explain]')).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);expect(requests).toEqual([]);
  } finally { await context.close(); }
});
