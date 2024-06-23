import { test, expect } from '@playwright/test';

const emailValues = [
  'jiojyosaavn1@gmail.com',
  'tamandeep_test4@test.com',
];

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

    // Verify cookies are set correctly
    const cookies = await page.context().cookies();
    console.log(cookies);
    await page.waitForTimeout(1000); // Small wait to ensure cookies are applied
  });

  test.afterEach(async ({ page }, testInfo) => {
    // If the test failed, capture a screenshot
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: screenshotPath });
      // Attach the screenshot to the test report
      testInfo.attachments.push({
        name: 'screenshot',
        path: screenshotPath,
        contentType: 'image/png'
      });
    }
    await page.close();
  });

  for (const email of emailValues) {
    test(`Popup handling with parameterized email value: ${email}`, async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Log In >' })).toBeVisible();
      await page.getByRole('link', { name: 'Log In >' }).click();
      await page.waitForSelector('text=Email');
      await page.reload();
      
      const cookies = await page.context().cookies();
      console.log(cookies);

      await page.waitForTimeout(4000); // Adjust timeout as needed
      await page.getByText('Email').click(); 
      
      await page.getByPlaceholder('Email Address').click();
      await page.getByPlaceholder('Email Address').fill(email);
      await page.getByPlaceholder('Password').click();
      await page.getByPlaceholder('Password').fill('Saavn123');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.locator('#header_user_menu div').first().click();

      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'Account Settings >' }).click();
      const page1 = await page1Promise;

      // Wait for page load and additional elements
      await page1.waitForLoadState('networkidle', { timeout: 20000 }); // Increased timeout
      await page1.waitForSelector('role=link[name="Contact Us >"]'); // Wait for a specific element

      await expect(page1.getByRole('link', { name: 'Contact Us >' })).toBeVisible();
      await expect(page1.getByRole('main').getByRole('link', { name: 'Help & Support >' })).toBeVisible();
      await expect(page1.getByRole('link', { name: 'Terms & Privacy >' })).toBeVisible();
      
      const page2Promise = page1.waitForEvent('popup');
      await page1.getByRole('link', { name: 'Contact Us >' }).click();
      const page2 = await page2Promise;

      // Wait for page load and additional elements
      await page2.waitForLoadState('networkidle', { timeout: 20000 }); // Increased timeout
      await page2.waitForSelector('role=heading[name="Contact Us."]'); // Wait for a specific element

      await expect(page2.getByRole('heading', { name: 'Contact Us.' })).toBeVisible();
      await expect(page2.getByText('No switchboards or email')).toBeVisible();
      await expect(page2.locator('#contact-types')).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Office Locations.' })).toBeVisible();
      await expect(page2.getByText('BOM Mumbai Saavn Media')).toBeVisible();
      await expect(page2.getByText('BLR Bengaluru Saavn Media')).toBeVisible();
      await expect(page2.getByText('DEL Gurugram Saavn Media')).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'JioSaavn' })).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Products' })).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Connect' })).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Legal' })).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Brands & Advertisers' })).toBeVisible();
      await expect(page2.getByRole('heading', { name: 'Gifts & Promotions' })).toBeVisible();
      await expect(page2.getByText('© 2024 Saavn Media Limited')).toBeVisible();
      
      const page3Promise = page1.waitForEvent('popup');
      await page1.getByRole('main').getByRole('link', { name: 'Help & Support >' }).click();
      const page3 = await page3Promise;

      // Wait for page load and additional elements
      await page3.waitForLoadState('networkidle', { timeout: 20000 }); // Increased timeout
      await page3.waitForSelector('role=heading[name="Before we start, where are"]'); // Wait for a specific element

      await expect(page3.getByRole('heading', { name: 'Before we start, where are' })).toBeVisible();
      await expect(page3.locator('#geolocation-container').getByRole('img', { name: 'JioSaavn Help Center home page' })).toBeVisible();
      await expect(page3.locator('#geolocation')).toBeVisible();
      await page3.locator('#geolocation').selectOption('IN');
      await expect(page3.getByRole('heading', { name: 'Welcome to JioSaavn!' })).toBeVisible();
      await expect(page3.getByRole('heading', { name: 'JioSaavn Plans' })).toBeVisible();
      await expect(page3.getByRole('heading', { name: 'Ads' })).toBeVisible();
      await expect(page3.getByRole('heading', { name: 'Speakers & Connected Devices' })).toBeVisible();
      await expect(page3.getByRole('heading', { name: 'JioTunes and Songs' })).toBeVisible();
      await expect(page3.getByRole('heading', { name: 'My Account' })).toBeVisible();
      
      const page4Promise = page1.waitForEvent('popup');
      await page1.getByRole('link', { name: 'Terms & Privacy >' }).click();
      const page4 = await page4Promise;

      // Wait for page load and additional elements
      await page4.waitForLoadState('networkidle', { timeout: 20000 }); // Increased timeout
      await page4.waitForSelector('role=heading[name="Terms of Use"]'); // Wait for a specific element

      await page4.getByRole('heading', { name: 'Terms of Use', exact: true }).click();
      await expect(page4.getByRole('heading', { name: 'Terms of Use', exact: true })).toBeVisible();
      await expect(page4.getByText('For details about JioSaavn’s')).toBeVisible();
      await expect(page4.getByRole('heading', { name: 'Introduction' })).toBeVisible();
      await expect(page4.getByText('This is a legal agreement')).toBeVisible();
      await expect(page4.getByRole('link', { name: 'Go Pro' })).toBeVisible();
      await expect(page4.getByRole('link', { name: 'Brands', exact: true })).toBeVisible();
      await expect(page4.getByRole('navigation').getByRole('link', { name: 'Careers' })).toBeVisible();
      await expect(page4.getByRole('navigation').getByRole('link', { name: 'Help' })).toBeVisible();
      await expect(page4.getByRole('navigation').getByRole('link', { name: 'News' })).toBeVisible();
      await expect(page4.getByRole('link', { name: 'Research', exact: true })).toBeVisible();
    });
  }
});
