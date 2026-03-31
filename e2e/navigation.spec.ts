import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('nav links scroll to correct sections', async ({ page }) => {
    // Click "Layanan" in nav
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
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(page.getByText('Cloud Infrastructure')).toBeVisible();
  });

  test('logo links to home', async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Click logo
    await page.getByRole('link', { name: /jvtech/i }).first().click();
    // Should be at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});
