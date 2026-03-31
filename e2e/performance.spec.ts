import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page loads within 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(errors).toHaveLength(0);
  });

  test('no JavaScript errors on load', async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(jsErrors).toHaveLength(0);
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    // Mobile menu button should be visible
    const menuBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(menuBtn).toBeVisible();
  });
});
