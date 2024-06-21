import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('validating if user is able to update his music languages',async()=>{
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
    await page.getByText('Music Languages').click();
    await page.getByText('English').click();
    await page.getByText('Punjabi', { exact: true }).click();
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('We will now show you music in')).toBeVisible();
})