import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('main pages load with local assets and responsive layouts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith('http://localhost') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of ['', 'portfolio/', 'publications/', 'cv/', 'projects/stateful-evaluation/']) {
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
  }
  expect(errors).toEqual([]);
});

test('theme persists and current research links have clear destinations', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('.research-focus').getByRole('link').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI-built test environments');
  await page.goBack();
  await page.locator('.research-focus').getByRole('link').last().click();
  await expect(page).toHaveURL(/projects\/soar-planning\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Small models for security playbooks');
});

test('research filters work and each project opens', async ({ page }) => {
  await page.goto('portfolio/');
  const highlights = page.getByRole('region', { name: 'Current research highlights' });
  await expect(highlights.getByRole('heading', { level: 2 })).toHaveText(['AI-built test environments', 'Small models for security playbooks']);
  await page.getByRole('button', { name: 'Agents & evaluation', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  await expect(page.locator('.filter-count')).toHaveText('2 projects');
  await page.getByRole('button', { name: 'Security & intelligence', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(3);
  await expect(highlights.getByRole('link')).toHaveCount(2);
  for (const link of await highlights.getByRole('link').all()) await expect(link).toBeVisible();
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  const links = await page.locator('.research-spotlight-link, .project-card-link').evaluateAll(anchors => anchors.map(a => (a as HTMLAnchorElement).href));
  expect(links).toHaveLength(7);
  for (const href of links) {
    await page.goto(href);
    const prose = page.locator('.project-prose, .contribution-copy');
    expect(await prose.count()).toBeGreaterThan(0);
    for (const section of await prose.all()) await expect(section).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('navigation supports touch and keyboard', async ({ page }, testInfo) => {
  await page.goto('');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Open navigation' });
    await toggle.click();
    await expect(page.locator('#mobile-nav')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-nav')).toBeHidden();
    await toggle.click();
    await page.locator('#mobile-nav').getByRole('link', { name: 'Publications' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Publications' }).click();
  }
  await expect(page).toHaveURL(/\/publications\/$/);
  await expect(page.locator('.publication-type.preprint')).toHaveCount(2);
});

test('legacy URLs reach their current destinations', async ({ page }) => {
  await page.goto('portfolio/portfolio-1/');
  await expect(page).toHaveURL(/\/projects\/threat-intelligence\/$/);
  await page.goto('publication/2024-llm-threat/');
  await expect(page).toHaveURL(/\/publications\/#cti-agent$/);
});

test('core content works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:4321/my_website/');
  await expect(page.getByRole('heading', { name: /AI agents for/ })).toBeVisible();
  await page.getByRole('link', { name: 'Explore my research' }).click();
  await expect(page.locator('.research-spotlight')).toHaveCount(2);
  await expect(page.locator('.project-card')).toHaveCount(5);
  await context.close();
});

test('home and research pages meet automated accessibility checks in both themes', async ({ page }) => {
  for (const route of ['', 'portfolio/']) {
    await page.goto(route);
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
      const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(scan.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
    }
  }
});
