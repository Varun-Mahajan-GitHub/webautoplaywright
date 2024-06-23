import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

function generateRandomEmail(): string {
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `${randomPart}@saavn.com`;
}

function saveEmailToFile(email: string): void {
    const filePath = path.join(__dirname, 'savedEmails.txt');
    fs.appendFileSync(filePath, email + '\n', 'utf8');
}

test.describe('New User Signup', () => {
    test.beforeEach(async ({ page }) => {
        // Add cookies to the context before navigating to the page
        await page.context().addCookies([{
            name: 'captcha-bypass',
            value: '6R1VzqByL1WCfSfTwiUcRWqO2YcftgB1u4',
            domain: '.jiosaavn.com',
            path: '/',
        }]);

        // Navigate to the webpage
        await page.goto('https://www.jiosaavn.com/');
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Sign up new user and interact with the site', async ({ page }) => {
        const randomEmail = generateRandomEmail();
        
        // Reload the page to apply cookies
        await page.reload();
        await page.waitForLoadState('networkidle');

        // Verify the cookies are set (for debugging)
        const cookies = await page.context().cookies();
        console.log(cookies);

        // Proceed with sign-up steps
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: 'Sign Up >' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('text=Email');
        await page.getByText('Email').click();
        await page.getByPlaceholder('Email Address').click();
        await page.getByPlaceholder('Email Address').fill(randomEmail); // Use the random email
        await page.getByPlaceholder('Email Address').press('Tab');
        await page.getByPlaceholder('Password', { exact: true }).fill('Saavn@123');
        await page.getByPlaceholder('Password', { exact: true }).press('Tab');
        await page.getByPlaceholder('Confirm Password').fill('Saavn@123');
        await page.getByRole('button', { name: 'Continue' }).click();
        
        // Wait for the profile icon to appear
        // await page.waitForSelector('img[alt="Profile"]', { timeout: 10000 });
        await expect(page.getByRole('img', { name: 'Profile' })).toBeVisible();

        // Interact with the site
        await page.getByRole('link', { name: 'Top Playlists' }).click();
        await page.waitForSelector('text=Hindi >', { timeout: 10000 });
        await page.getByRole('link', { name: 'Hindi >' }).click();

        // Save the generated email for future use
        saveEmailToFile(randomEmail);
    });
});
