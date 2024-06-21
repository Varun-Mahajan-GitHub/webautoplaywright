import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';


test('verify if the music menu is displayed on hovering over music link', async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByRole('link', { name: 'Music >' }).hover()
    await expect(page.getByRole('heading', { name: 'What\'s Hot on JioSaavn' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Top Playlists' })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('heading', { name: 'Top Artists' })).toBeVisible()

})