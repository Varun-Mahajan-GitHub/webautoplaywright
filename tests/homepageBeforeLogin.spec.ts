/* open the browser,
verify the create playlist button in logged out state,
verify the songs button in logged out state,
verify user can scroll till the end,
verify go pro page,
verify browse page tab,
verify the surpise button,
verify that modules are not repeated,
One tap verification */

import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('Verify create playlist in logged out state',async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByText('New Playlist').click();
    await expect(page.getByRole('heading', { name: 'Welcome to JioSaavn.' })).toBeVisible();
    await expect(page.getByText('Log in to create playlists,')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your mobile number')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
})
test('Verify the songs button in logged out state',async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByText('Liked Songs').click();
    await expect(page.getByText('Log in to create playlists,')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Log in to create playlists, build your library, get personalized recommendations & more!');
    await expect(page.getByRole('heading', { name: 'Welcome to JioSaavn.' })).toBeVisible();
})

test('verify user can scroll till the end', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    const footer = page.getByText('© 2024 Saavn Media Limited');
    await footer.scrollIntoViewIfNeeded();
  
    // Assert that the footer is visible
    await expect(footer).toBeVisible();
  });

test('verify go pro page', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByRole('link', { name: 'Pro >' }).click();
    await expect(page.getByRole('button', { name: 'Go Pro' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Available Plans' })).toBeVisible();
});

test('verify browse page tab and surprise button', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
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

test('Verify <h2> elements with class "u-h4" are not repeated', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.saavn.com/');

    const elementTexts = await page.$$eval('h2.u-h4', elements => elements.map(e => e.textContent.trim()));
    const uniqueElements = new Set(elementTexts);
    expect(uniqueElements.size).toBe(elementTexts.length);
});

test('Click the second one tap play button', async () => {
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    const playButtons = page.locator('//i[@class="o-icon-play o-icon--large"]');
    await playButtons.nth(1).click();
    await expect(page.locator('#player_play_pause')).toBeVisible();
  });
  