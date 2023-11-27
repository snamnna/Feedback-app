import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:3000";

test.describe("Language buttons functionality test", () => {

/**
 * 
 * Language settings are available in Login, Registration and User Settings.
 * Available languages: English, Farsi, Finnish
 * 
 */
    
    test.beforeEach(async ({ page }) => {
        
        page.goto(`${BASE_URL}`)
        await page.waitForTimeout(500);

    });

    // Triggered from test: user settings
    let login = async (page) => {

        // Find username input field and fill
        const usernameInput = page.locator('input#username');
        expect(usernameInput).toBeTruthy();
        await usernameInput.click();
        await usernameInput.fill('student1');
        
        // Find password input field and fill
        const passwordInput = page.locator('input#password');
        expect(passwordInput).toBeTruthy();
        await passwordInput.click();
        await passwordInput.fill('test');
        
        // Find the submit button and submit the form
        const submitButton = page.locator('button#submit-btn');
        expect(submitButton).toBeVisible();
        await submitButton.click();
        await page.waitForURL(`${BASE_URL}`);
        
        // Confirm location on Dashboard
        const dashboardText = page.getByText('My Courses');
        expect(dashboardText).toBeVisible;
    }
    
    test('login', async ({ page }) => {

        const enLoginHeading = page.locator('h1:has-text("Sign in to your account")');
        const fiLoginHeading = page.locator('h1:has-text("Kirjaudu sisään")');
        const faLoginHeading = page.locator('h1:has-text("به حساب کاربری خود وارد شوید")');

        await expect(page).toHaveURL(`${BASE_URL}/login`);

        await page.locator('#language-selector').selectOption('en');
        await expect(enLoginHeading, 'failed: login in English').toBeVisible();

        await page.locator('#language-selector').selectOption('fa');
        await expect(faLoginHeading, 'failed: login in Farsi').toBeVisible();
        
        await page.locator('#language-selector').selectOption('fi');
        await expect(fiLoginHeading, 'failed: login in Finnish').toBeVisible();
        

    });

    test('registration', async ({ page }) => {

        const enRegisterHeading = page.locator('h1:has-text("Register")');
        const faRegisterHeading = page.locator('h1:has-text("ثبت‌نام")');
        const fiRegisterHeading = page.locator('h1:has-text("Rekisteröidy")');

        const registerLink = page.locator('a.link-primary[href="/register"]');
        await registerLink.click();

        await page.locator('#language-selector').selectOption('en');
        await expect(enRegisterHeading, 'failed: registration in English').toBeVisible();

        await page.locator('#language-selector').selectOption('fa');
        await expect(faRegisterHeading, 'failed: registration in Farsi').toBeVisible();
        
        await page.locator('#language-selector').selectOption('fi');
        await expect(fiRegisterHeading, 'failed: registration in Finnish').toBeVisible();

    });

    test('user settings', async ({ page }) => {

        const enRegisterHeading = page.locator('h1:has-text("User Settings")');
        const faRegisterHeading = page.locator('h1:has-text("کاربر تنظیمات")');
        const fiRegisterHeading = page.locator('h1:has-text("Käyttäjäasetukset")');

        await login(page);
        const userSettingsBtn = page.locator('a[href="/user"]:has-text("U")');
        await userSettingsBtn.click();

        await page.locator('#language-selector').selectOption('en');
        await expect(enRegisterHeading, 'failed: user settings in English').toBeVisible();

        await page.locator('#language-selector').selectOption('fa');
        await expect(faRegisterHeading, 'failed: user settings in Farsi').toBeVisible();
        
        await page.locator('#language-selector').selectOption('fi');
        await expect(fiRegisterHeading, 'failed: user settings in Finnish').toBeVisible();

        await page.getByRole('link', { name: 'U' }).click();

    });

});
