import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.jiosaavn.com/');
  await expect(page.getByRole('heading', { name: 'Radio Stations' })).toBeVisible();
  await page.locator('article').filter({ hasText: 'Bollywood Retro 70s-80sHindi' }).locator('i').click({
    button: 'right'
  });
});