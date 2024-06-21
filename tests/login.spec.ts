import { test, expect, Browser, Page } from '@playwright/test';
import { webkit, chromium, firefox } from 'playwright';

test('login test', async () => {
  
  const browser:Browser = await firefox.launch({headless: false});
  const context = await browser.newContext();
  await context.addCookies([{
    name: 'captcha-bypass',
    value: '6R1VzqByL1WCfSfTwiUcRWqO2YcftgB1u4',
    domain: 'https://www.jiosaavn.com',
    path: '/',
  }]);
  const page:Page = await context.newPage()
  await page.goto('https://www.jiosaavn.com/');
  
  // Refresh the page
  
  await page.getByRole('link', { name: 'Log In >' }).click();

  await page.getByText('Email').click();
  await page.reload();
  await page.waitForTimeout(5000)
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('vm999@saavn.com');
  await page.getByPlaceholder('Email Address').press('Tab');
  await page.getByPlaceholder('Password').fill('Saavn@123');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('img', { name: 'Profile' })).toBeVisible();
  });