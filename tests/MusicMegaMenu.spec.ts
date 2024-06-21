import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test.describe('Music Mega menu tests', ()=>{
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.jiosaavn.com/');
      });

    test.afterEach(async({page})=>{
        await page.close();
    })

    test('verify if the music menu is displayed on hovering over music link', async ({ page }) => {
        // Use the locator to find the link by role and hover over it
        await page.locator('role=link[name="Music >"]').hover();
        // Use the locator to check visibility of headings under the music menu
        await expect(page.locator('role=heading[name="What\'s Hot on JioSaavn"]')).toBeVisible();
        await expect(page.locator('role=heading[name="Top Playlists"]')).toBeVisible();
        // Find the banner element and check for a heading within it
        await expect(page.locator('role=banner >> role=heading[name="Top Artists"]')).toBeVisible();
      });
})
