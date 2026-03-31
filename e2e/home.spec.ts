import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('loads homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/JVTech/);
  });

  test('renders hero section', async ({ page }) => {
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
  });

  test('renders navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('renders CTA button', async ({ page }) => {
    const cta = page.getByRole('link', { name: /konsultasi/i }).first();
    await expect(cta).toBeVisible();
  });

  test('renders services section', async ({ page }) => {
    const services = page.locator('#services');
    await expect(services).toBeVisible();
  });

  test('renders stats section', async ({ page }) => {
    await expect(page.getByText('Proyek Selesai')).toBeVisible();
  });

  test('renders contact form', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('contact form has submit button', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /kirim/i });
    await expect(submitBtn).toBeVisible();
  });
});
