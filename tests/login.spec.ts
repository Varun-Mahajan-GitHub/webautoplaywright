import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('login test', async () => {
  
    const browser:Browser = await firefox.launch({headless: false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.jiosaavn.com/');
  await page.getByRole('link', { name: 'Log In >' }).click();
  await page.getByText('Email').click();
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('vm999@saavn.com');
  await page.getByPlaceholder('Email Address').press('Tab');
  await page.getByPlaceholder('Password').fill('Saavn@123');
  await page.frameLocator('iframe[name="a-s51umpx91ad1"]').getByLabel('I\'m not a robot').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('img', { name: 'Profile' })).toBeVisible();
  });