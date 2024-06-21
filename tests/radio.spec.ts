import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';



test('Verify radio languages', async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByRole('link', { name: 'Radio', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Hindi >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tamil >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Telugu >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'English >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Punjabi >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Marathi >' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kannada >' })).toBeVisible();
})
