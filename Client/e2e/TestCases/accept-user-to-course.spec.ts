import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Teacher feature: accept user (student) to a course", () => {

    let studentId;

    // Login before each test
    test.beforeEach(async ({ page }) => {

        page.goto(`${BASE_URL}/login`)
        // Find username input field and fill
        const usernameInput = page.locator('input#username');
        expect(usernameInput).toBeTruthy();
        await usernameInput.click();
        await usernameInput.fill('teacher2');

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
        const dashboardText = page.getByText('My Courses');
        expect(dashboardText).toBeVisible;
        await page.waitForTimeout(1000);
    });

    test('find request and accept user', async ({ page }) => {

        let liElements = await page.locator('li:has(div[data-testid="course-card"])').elementHandles(); // Look for course cards
        let courseFound = false;
        
        if (liElements) { // Continue if courses were found
            courseFound = true;
            console.log("Courses were found");

            // Start going through courses one by one to find the first one with a pending enrollment request
            for (let i = 1; i <= liElements.length; i++) {

                await liElements[i - 1].click();
                await page.waitForLoadState();  // Ensure the page is loaded
                liElements = await page.locator('li:has(div[data-testid="course-card"])').elementHandles();  // Re-locate the elements
                console.log("Clicked on course card.");

                let currentUrl = page.url();
                console.log("Course URL: " + currentUrl);

                let courseId = currentUrl.replace(`${BASE_URL}/courses/`, '');
                console.log("Course ID currently: " + courseId);

                const enrollmentsTab = page.locator('a:has-text("Enrollments")');
                if (enrollmentsTab) {
                    await enrollmentsTab.click();
                    console.log("Clicked on Enrollments tab.");
                    await expect(enrollmentsTab).toHaveClass('tab tab-active'); // Make sure Enrollments tab is selected
                }

                try {
                    await page.waitForSelector('li:has(button:has-text("Accept"))', { state: 'attached', timeout: 5000 });
                } catch (error) {
                    console.log("No enrollment requests found. Returning to Dashboard and trying again.\n");
                    page.goBack(); // Return to Dashboard and try again
                    await page.waitForTimeout(2000);
                }

                await page.waitForLoadState();
                const noEnrollments = page.locator('text="No enrollments available"'); // This text is visible if there are no requests

                if (!(await noEnrollments.isVisible())) { // Continue if "no enrollments" text wasn't found
                    const liElements = await page.$$('li');
                    let firstPendingRequest;

                    for (let li of liElements) {
                        const acceptButton = await li.$('button:has-text("Accept")');
                        if (acceptButton) {
                            firstPendingRequest = li;
                            break;
                        }
                    }

                    //const firstPendingRequest = await page.$('li:has(button:has-text("Accept"))');  // Requests are in a list structure, look for first one

                    if (firstPendingRequest) { // First request was located
                        console.log("Pending request located on Enrollments tab.");
                        const studentIdElement = await firstPendingRequest.$('p'); // Find the <p> element
                        const studentIdElementText = await studentIdElement?.innerText(); // <p> element contains student id
                        console.log(`Student ID Element Text: ${studentIdElementText}`);
                        studentId = studentIdElementText.split(': ')[1];
                        
                        // Find Accept button & click
                        const acceptButton = await firstPendingRequest.$('button:has-text("Accept")');
                        await page.waitForTimeout(1000);
                        await acceptButton?.click();
                        console.log(`Enrollment accepted for student with ID: ${studentId}`);
                        break;
                    }
                }
            }
        } else {
            throw new Error('No courses found on the Dashboard.');
        }
        expect(courseFound).toBeTruthy();
    });

/* WORK IN DEVELOPMENT
    test('find accepted student', async ({ page }) => {

        page.goto(`${BASE_URL}/courses/${courseId}`);

        // Check that accepted student can be found in Participants list
        const participantsTab = page.locator('a:has-text("Participants")');
        await participantsTab.click();
        await expect(participantsTab).toHaveClass('tab tab-active'); // Make sure Participants tab is selected

        let studentFound = false;
        const participants = await page.$$('li'); // Look for participant list elements
        
        // Find each participant's student id and compare it with the accepted student's id
        for (const participant of participants) {
            const participantText = await participant.$('p');
            const participantDetails = await participantText?.innerText();

            if (participantDetails?.includes(studentId)) {
                studentFound = true;
                console.log(`Student with ID ${studentId} is present in the Participants tab.`);
                break; // Stop looking through participants
            }
        }

        expect(studentFound).toBeTruthy();
    });
*/

});