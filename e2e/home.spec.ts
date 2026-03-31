import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    await expect(page.getByRole('link', { name: /beranda/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /layanan/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tentang/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /kontak/i })).toBeVisible();
  });

  test('renders CTA button', async ({ page }) => {
    const cta = page.getByRole('link', { name: /konsultasi/i }).first();
    await expect(cta).toBeVisible();
  });

  test('renders services section', async ({ page }) => {
    const services = page.locator('#services');
    await expect(services).toBeVisible();
    await expect(page.getByText('Cloud Infrastructure').first()).toBeVisible();
    await expect(page.getByText('Cyber Security').first()).toBeVisible();
  });

  test('renders stats section', async ({ page }) => {
    await expect(page.getByText('Proyek Selesai')).toBeVisible();
    await expect(page.getByText('Klien Aktif')).toBeVisible();
  });

  test('renders contact form', async ({ page }) => {
    await expect(page.getByText('Hubungi Kami')).toBeVisible();
    await expect(page.getByLabel('Nama')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Pesan')).toBeVisible();
  });

  test('contact form submission shows validation', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /kirim/i });
    await submitBtn.click();
    // Should show validation error for empty name
    await expect(page.getByText('Nama harus minimal 2 karakter')).toBeVisible();
  });
});
