import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'projects/stateful-evaluation/#concept-demo';

test('walkthrough distinguishes a met goal, a missed action, and a fresh runtime', async ({ page }) => {
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await lab.getByRole('button', { name: '04 Inspect' }).click();
  await expect(lab.locator('[data-account-state]')).toHaveText('Disabled');
  await expect(lab.locator('[data-verdict]')).toHaveText('Goal met');
  await lab.getByRole('button', { name: 'Missed action', exact: true }).click();
  await expect(lab).toHaveAttribute('data-phase', '0');
  await lab.getByRole('button', { name: '04 Inspect' }).focus();
  await page.keyboard.press('Enter');
  await expect(lab.locator('[data-account-state]')).toHaveText('Active');
  await expect(lab.locator('[data-verdict]')).toHaveText('Goal missed');
  await expect(lab.locator('[data-step-description]')).toContainText('never disabled it');
  await lab.getByRole('button', { name: '05 Rebuild' }).click();
  await expect(lab.locator('[data-runtime-id]')).toHaveText('ENV 02');
  await expect(lab.locator('[data-account-state]')).toHaveText('Active');
  await expect(lab.locator('[data-observed]')).toHaveText('Fresh baseline');
  await lab.getByRole('button', { name: 'Start over' }).click();
  await expect(lab.locator('[data-runtime-id]')).toHaveText('ENV 01');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const diagram = await page.request.get('http://localhost:4321/my_website/pipeline1-concept.svg');
  expect(diagram.ok()).toBe(true);
  expect(await diagram.text()).toContain('Disposable');
});

test('playback can pause, finish, and replay without automatic startup', async ({ page }) => {
  await page.clock.install();
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await expect(lab).toHaveAttribute('data-playing', 'false');
  await lab.getByRole('button', { name: 'Play walkthrough' }).click();
  await page.clock.fastForward(3500);
  await expect(lab).toHaveAttribute('data-phase', '1');
  await lab.getByRole('button', { name: 'Pause walkthrough' }).click();
  await page.clock.fastForward(7000);
  await expect(lab).toHaveAttribute('data-phase', '1');
  await lab.getByRole('button', { name: 'Play walkthrough' }).click();
  for (let i = 0; i < 3; i++) await page.clock.fastForward(3500);
  await expect(lab).toHaveAttribute('data-phase', '4');
  await expect(lab).toHaveAttribute('data-playing', 'false');
  await lab.getByRole('button', { name: 'Replay walkthrough' }).click();
  await expect(lab).toHaveAttribute('data-phase', '0');
  await expect(lab).toHaveAttribute('data-playing', 'true');
});

test('reduced motion retains manual controls and both outcomes are accessible in both themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  const lab = page.locator('.pipeline-lab');
  await expect(lab.getByRole('button', { name: 'Play walkthrough' })).toBeHidden();
  await expect(lab.getByText('Reduced motion: use the steps to explore.')).toBeVisible();
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.getByRole('button', { name: 'Switch to light theme' }).click();
    for (const scenario of ['Working playbook', 'Missed action']) {
      await lab.getByRole('button', { name: scenario, exact: true }).click();
      await lab.getByRole('button', { name: '04 Inspect' }).click();
      const scan = await new AxeBuilder({ page }).include('.pipeline-lab').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(scan.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) }))).toEqual([]);
    }
  }
});

test('the concept remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:4321/my_website/projects/stateful-evaluation/#concept-demo');
    await expect(page.locator('.lab-static-steps li')).toHaveCount(5);
    await expect(page.getByRole('heading', { name: /Room to test/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Play walkthrough' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Download the diagram' })).toBeVisible();
  } finally { await context.close(); }
});
