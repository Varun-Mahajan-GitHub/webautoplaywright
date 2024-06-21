import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.jiosaavn.com/');
  await expect(page.getByRole('heading', { name: 'Recommended Artist Stations' })).toBeVisible();
});