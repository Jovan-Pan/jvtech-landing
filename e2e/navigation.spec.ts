import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('nav links scroll to correct sections', async ({ page }) => {
    await page.getByRole('link', { name: /layanan/i }).click();
    const services = page.locator('#services');
    await expect(services).toBeInViewport();
  });

  test('CTA button scrolls to contact', async ({ page }) => {
    await page.getByRole('link', { name: /konsultasi/i }).first().click();
    const contact = page.locator('#contact');
    await expect(contact).toBeInViewport();
  });

  test('footer links are present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cloud Infrastructure' }).first()).toBeVisible();
  });

  test('logo links to home', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const logo = page.locator('a[href="/"]').first();
    await logo.click();
    await page.waitForTimeout(500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(500);
  });
});
