import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('nav links are clickable', async ({ page }) => {
    const link = page.getByRole('link', { name: /layanan/i });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(1000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('CTA button scrolls to contact', async ({ page }) => {
    await page.getByRole('link', { name: /konsultasi/i }).first().click();
    const contact = page.locator('#contact');
    await expect(contact).toBeInViewport();
  });

  test('footer is rendered', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cloud Infrastructure' }).first()).toBeVisible();
  });

  test('logo is present', async ({ page }) => {
    const logo = page.locator('a[href="/"]').first();
    await expect(logo).toBeAttached();
  });
});
