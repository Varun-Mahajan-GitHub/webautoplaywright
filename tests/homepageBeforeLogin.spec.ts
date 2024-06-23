import { test, expect } from '@playwright/test';

test.describe('JioSaavn Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Launch the browser
    await page.goto('https://www.jiosaavn.com/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify create playlist in logged out state', async ({ page }) => {
    await page.click('text=New Playlist');
    await expect(page.getByRole('heading', { name: 'Welcome to JioSaavn.' })).toBeVisible();
    await expect(page.locator('text=Log in to create playlists,')).toBeVisible();
    await expect(page.locator('[placeholder="Enter your mobile number"]')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
  });

  test('Verify the songs button in logged out state', async ({ page }) => {
    await page.click('text=Liked Songs');
    await expect(page.locator('text=Log in to create playlists,')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Log in to create playlists, build your library, get personalized recommendations & more!');
    await expect(page.getByRole('heading', { name: 'Welcome to JioSaavn.' })).toBeVisible();
  });

  test('Verify user can scroll till the end', async ({ page }) => {
    const footer = page.locator('text=© 2024 Saavn Media Limited');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });

  test('Click the second one tap play button', async ({page}) => {
    const playButtons = page.locator('//i[@class="o-icon-play o-icon--large"]');
    await playButtons.nth(1).click();
    await expect(page.locator('#player_play_pause')).toBeVisible();
  });

test('verify browse page tab and surprise button', async ({page}) => {
    await page.locator('#sidebar_library').getByRole('link', { name: 'New Releases' }).click();
    await expect(page.getByRole('heading', { name: 'New Songs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Hindi >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tamil >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'English >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Punjabi >' })).toBeVisible();
    await page.locator('#sidebar_library').getByRole('link', { name: 'Top Charts' }).click();
    await expect(page.getByRole('heading', { name: 'Top Music Charts' })).toBeVisible();
    await page.getByRole('link', { name: 'Podcasts', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Trending Podcasts' })).toBeVisible();
    await page.locator('#sidebar_library').getByRole('link', { name: 'Top Artists' }).click();
    await expect(page.getByRole('main').getByRole('heading', { name: 'Top Artists' })).toBeVisible();
    await page.getByRole('link', { name: 'Radio', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Radio Stations' })).toBeVisible();
    await expect(page.locator('#surprise_me')).toBeVisible();
    await page.locator('#surprise_me').click();
    await expect(page.locator('#player_play_pause')).toBeVisible();
  });

  test('verify go pro page', async ({page}) => {
    await page.getByRole('link', { name: 'Pro >' }).click();
    await expect(page.getByRole('button', { name: 'Go Pro' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Plans' })).toBeVisible();
});
})
