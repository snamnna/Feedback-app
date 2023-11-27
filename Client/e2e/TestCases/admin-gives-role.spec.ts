import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:3000";

test.describe("Admin feature: admin gives teacher role to user", () => {

/**
 * PREREQUISITES for the test to pass:
 * 
 * - user with ID 108 has to be admin
 * - user with ID 109 has to be student
 */
    
    // Login before each test
    test.beforeEach(async ({ page }) => {
        
        page.goto(`${BASE_URL}/login`)
        // Find username input field and fill
        const usernameInput = page.locator('input#username');
        expect(usernameInput).toBeTruthy();
        await usernameInput.click();
        await usernameInput.fill('test-admin');
        
        // Find password input field and fill
        const passwordInput = page.locator('input#password');
        expect(passwordInput).toBeTruthy();
        await passwordInput.click();
        await passwordInput.fill('Feedb4ck#');
        
        // Find the submit button and submit the form
        const submitButton = page.locator('button#submit-btn');
        expect(submitButton).toBeVisible();
        await submitButton.click();
        await page.waitForURL(`${BASE_URL}`);
        
        // Confirm location on Dashboard
        const dashboardText = page.getByText('My Courses');
        expect(dashboardText).toBeVisible;
        await page.waitForTimeout(500);
    });
    
    test('find user and give teacher role', async ({ page }) => {
        test.setTimeout(60000); // Set execution timeout to 1 minute
        let roleChanged = false;
        const editableTeacher = 'test-teacher';

        // Role change function triggered from switch case 'STUDENT'
        let giveTeacherRole = async () => {
            try {
                const roleSelect = page.locator('select#role-select');
                await expect(roleSelect).toBeVisible( { timeout: 5000 });
                if (roleSelect) {
                    await roleSelect.selectOption({ value: 'TEACHER' }, {timeout: 5000} );
                }

                const roleSubmitBtn = page.locator('button#role-sbmt-btn');
                await roleSubmitBtn.click();

                page.on("dialog", async (dialog) => {
                    const message = dialog.message();
                    expect(message).toContain("User type changed successfully!");
                    await dialog.accept().catch(() => {});
                });
        
                roleChanged = true;
            } catch {
                expect(roleChanged, 'role change failed').toBeTruthy();
            }
        }
        
        // Role verification function triggered from switch case 'STUDENT'
        let verifyTeacherRole = async () => {
            try {
                await page.waitForTimeout(1000);
                await page.reload();
            } catch (error) {
                console.error('Error reloading page: ', error);
            }
            
            await page.waitForLoadState();
            const userSearchField = page.locator('input#user-search');
            await userSearchField.click();
            await userSearchField.fill(`${editableTeacher}`);
            const searchBtn = page.locator('button#search-btn');
            await searchBtn.click();

            try {
                await page.waitForSelector('#role-select', { timeout: 5000 });
                // @ts-ignore
                userRole = await page.$eval('#role-select', el => el.value);
                console.log(`The user now has the ${userRole} role.`);
            } catch (error) {
                console.log("Unable to determine the user's role.");
            }
        }

        // Executed after login
        const adminPanelBtn = page.getByRole('button', { name: 'Admin panel' });
        await expect(adminPanelBtn).toBeVisible();
        await adminPanelBtn.click();
        await page.waitForLoadState(); // Ensure the page is loaded

        await expect(page).toHaveURL(`${BASE_URL}/admin`);
        const heading = page.locator('h1:has-text("User Search")');
        expect(heading).toBeTruthy();

        const userSearchField = page.locator('input#user-search');
        await userSearchField.click();
        await userSearchField.fill(`${editableTeacher}`);
        const searchBtn = page.locator('button#search-btn');
        await searchBtn.click();

        // Check that page contains correct user info
        let username = page.locator(`div:has-text("Username: ${editableTeacher}")`);
        expect(username, 'user not found').toBeTruthy();
        
        let userRole;

        try {
            await page.waitForSelector('#role-select', { timeout: 5000 });
            // @ts-ignore
            userRole = await page.$eval('#role-select', el => el.value);
        } catch (error) {
            console.log("Unable to determine the user's role.");
        }

        if (userRole) {
            switch(userRole) {
                case 'STUDENT':
                    await giveTeacherRole();
                    await verifyTeacherRole();
                    break;
                case 'TEACHER':
                    console.log('The user is already a teacher. Aborting.');
                    break;
                case 'ADMIN':
                    console.log('The user is an admin. Aborting.');
                    break;
                default:
                    console.log("The user's role is unknown.");
                    break;
            }
        }
        expect(roleChanged, 'user does not have student role').toBeTruthy();
    });
});
