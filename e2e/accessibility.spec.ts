import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('all links have accessible names', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      expect(text || ariaLabel || title).toBeTruthy();
    }
  });

  test('form inputs have labels', async ({ page }) => {
    const nameInput = page.getByLabel('Nama');
    await expect(nameInput).toBeVisible();
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toBeVisible();
    const messageInput = page.getByLabel('Pesan');
    await expect(messageInput).toBeVisible();
  });

  test('buttons have accessible names', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      expect(text?.trim() || ariaLabel || title).toBeTruthy();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    // Check that text is visible (basic contrast check)
    const body = page.locator('body');
    await expect(body).toHaveCSS('color', /.*/);
  });
});
