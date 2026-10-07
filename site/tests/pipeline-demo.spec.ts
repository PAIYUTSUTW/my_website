import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'projects/stateful-evaluation/#concept-demo';

test('service comparison is visible immediately and only the mock is rebuilt', async ({ page }) => {
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await expect(lab.locator('.lab-before')).toBeVisible();
  await expect(lab.locator('.lab-after')).toBeVisible();
  await expect(lab.locator('.lab-agent')).toContainText('Pipeline1 agent');
  await expect(lab.locator('.lab-generation')).toContainText('generates');
  await lab.getByRole('button', { name: 'Pause light effects' }).click();
  await expect(lab).toHaveAttribute('data-effects', 'paused');
  await expect(lab.locator('.beam-generation .beam-light').last()).toHaveCSS('animation-play-state', 'paused');
  await lab.getByRole('button', { name: 'Resume light effects' }).click();
  await expect(lab).toHaveAttribute('data-effects', 'running');
  const originalPath = await lab.locator('.lab-before').innerText();
  const unchangedTools = await lab.locator('.lab-after .lab-playbook, .lab-after .lab-connector').allTextContents();
  await lab.getByRole('button', { name: 'Before', exact: true }).click();
  await expect(lab).toHaveAttribute('data-phase', 'before');
  await expect(lab.getByRole('button', { name: 'Discard & rebuild mock' })).toBeDisabled();
  await lab.getByRole('button', { name: 'With Pipeline1', exact: true }).focus();
  await page.keyboard.press('Enter');
  await lab.getByRole('button', { name: 'Discard & rebuild mock' }).click();
  await expect(lab.locator('[data-instance]')).toHaveText('MOCK 02');
  expect(await lab.locator('.lab-before').innerText()).toBe(originalPath);
  expect(await lab.locator('.lab-after .lab-playbook, .lab-after .lab-connector').allTextContents()).toEqual(unchangedTools);
  await lab.getByRole('button', { name: 'Discard & rebuild mock' }).click();
  await expect(lab.locator('[data-instance]')).toHaveText('MOCK 03');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const diagram = await page.request.get('http://localhost:4321/my_website/pipeline1-concept.svg');
  expect(diagram.ok()).toBe(true);
  expect(await diagram.text()).toContain('generates this mock');
});

test('animation shows real service, agent generation, then the mock and can pause', async ({ page }) => {
  await page.clock.install();
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await expect(lab).toHaveAttribute('data-playing', 'false');
  await lab.getByRole('button', { name: 'Watch the replacement' }).click();
  await expect(lab).toHaveAttribute('data-phase', 'before');
  await page.clock.fastForward(2700);
  await expect(lab).toHaveAttribute('data-phase', 'generate');
  await expect(lab.locator('[data-status]')).toContainText('generates a software mock');
  await lab.getByRole('button', { name: 'Pause animation' }).click();
  await page.clock.fastForward(6000);
  await expect(lab).toHaveAttribute('data-phase', 'generate');
  await lab.getByRole('button', { name: 'Continue animation' }).click();
  await page.clock.fastForward(2700);
  await expect(lab).toHaveAttribute('data-phase', 'after');
  await expect(lab).toHaveAttribute('data-playing', 'false');
  await lab.getByRole('button', { name: 'Watch the replacement' }).click();
  await expect(lab).toHaveAttribute('data-phase', 'before');
});

test('comparison is accessible in both themes and reduced motion preserves controls', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await expect(lab.getByRole('button', { name: 'Watch the replacement' })).toBeHidden();
  await expect(lab.locator('[data-effects-toggle]')).toBeHidden();
  await expect(lab).toHaveAttribute('data-effects', 'paused');
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.getByRole('button', { name: 'Switch to light theme' }).click();
    for (const view of ['Before', 'With Pipeline1']) {
      await lab.getByRole('button', { name: view, exact: true }).click();
      const scan = await new AxeBuilder({ page }).include('.pipeline-lab').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(scan.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
    }
  }
  await lab.getByRole('button', { name: 'Discard & rebuild mock' }).click();
  await expect(lab.locator('[data-instance]')).toHaveText('MOCK 02');
});

test('before, after, and agent generation remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:4321/my_website/projects/stateful-evaluation/#concept-demo');
    await expect(page.getByRole('heading', { name: 'Real service → software mock.' })).toBeVisible();
    await expect(page.locator('.lab-before')).toContainText('Real service');
    await expect(page.locator('.lab-after')).toContainText('Software-defined mock environment');
    await expect(page.locator('.lab-generation')).toContainText('Pipeline1 agent');
    await expect(page.getByRole('button', { name: 'Watch the replacement' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Download the diagram' })).toBeVisible();
  } finally { await context.close(); }
});
