import { test, expect } from '@playwright/test';

test.describe('JioSaavn Website Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().addCookies([{
            name: 'captcha-bypass',
            value: '6R1VzqByL1WCfSfTwiUcRWqO2YcftgB1u4',
            domain: '.jiosaavn.com',
            path: '/',
        }]);
      await page.goto('https://www.jiosaavn.com/');
      await page.waitForLoadState('networkidle');
    });
  
    test.afterEach(async ({ page }) => {
      await page.close();
    });

    test('Verify login with email is working', async ({ page }) => {    
        
        await expect(page.getByRole('link', { name: 'Log In >' })).toBeVisible();
        await page.getByRole('link', { name: 'Log In >' }).click();
        await page.waitForSelector('text=Email');
        await page.reload();
        const cookies = await page.context().cookies();
        console.log(cookies);
        await page.waitForTimeout(4000)
        await page.getByText('Email').click();
        
        await page.getByPlaceholder('Email Address').click();
        await page.getByPlaceholder('Email Address').fill('ag2020@gmail.com');
        await page.getByPlaceholder('Email Address').press('Tab');
        await page.getByPlaceholder('Password').fill('Saavn123');

        await page.getByRole('button', { name: 'Continue' }).click();
        await page.waitForSelector('img[alt="Profile"]', { timeout: 10000 });
        await expect(page.getByRole('img', { name: 'Profile' })).toBeVisible();
        await page.getByRole('img', { name: 'Profile' }).click();
        await page.getByText('Log Out').click();
        await expect(page.getByText('Successfully logged out!')).toBeVisible()
        await expect(page.getByRole('img', { name: 'Profile' })).not.toBeVisible();
    });

})