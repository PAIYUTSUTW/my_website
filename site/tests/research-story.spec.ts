import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const route = 'projects/stateful-evaluation/';

test('research story explains the problem before the approach and comparison', async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('.study-lead')).toContainText('security playbooks: automated workflows');
  await expect(page.getByRole('heading', { name: 'Generating a workflow is only the beginning.' })).toBeVisible();
  const mainText = await page.locator('main').innerText();
  expect(mainText.indexOf('THE PROBLEM')).toBeLessThan(mainText.indexOf('OUR APPROACH'));
  expect(mainText).not.toMatch(/software mock|Pipeline1|MOCK 0\d|Watch the replacement/i);
  await expect(page.getByRole('group', { name: 'Testing with a real service', exact: true })).toContainText('Real service');
  await expect(page.getByRole('group', { name: 'Testing with a generated environment' })).toContainText('Built by our AI agent');
  await expect(page.locator('.comparison-context')).toContainText('existing security automation platform and service connector');
  await expect(page.locator('.contribution-section')).toContainText('design goals');
  await page.getByRole('link', { name: 'See how it works' }).click();
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
    await expect(page.locator('h1')).toContainText('Test AI workflows.');
    await expect(page.locator('.problem-section')).toContainText('virtual machines');
    await expect(page.locator('.generated-path')).toContainText('Generated test environment');
    await expect(page.locator('.contribution-section')).toContainText('ongoing research');
    await page.locator('summary').click();
    await expect(page.locator('.technical-content')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download the overview diagram' })).toHaveAttribute('href', /^data:image\/svg\+xml;base64,/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(requests).toEqual([]);
  } finally { await context.close(); }
});
