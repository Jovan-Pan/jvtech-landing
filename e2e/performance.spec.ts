import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('page loads within budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(15000);
  });

  test('no unhandled JS errors', async ({ page }) => {
    const jsErrors: Error[] = [];
    page.on('pageerror', (error) => jsErrors.push(error));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    expect(jsErrors).toHaveLength(0);
  });

  test('mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('hero section is present on load', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hero = page.locator('#hero');
    await expect(hero).toBeAttached();
  });
});
