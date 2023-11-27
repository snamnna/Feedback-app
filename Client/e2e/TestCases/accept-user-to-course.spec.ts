import { test, expect } from "@playwright/test";
import { ElementHandleForTag } from "playwright-core/types/structs";

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

        // Confirm location on Dashboard
        const dashboardText = page.getByText('My Courses');
        expect(dashboardText).toBeVisible;
        await page.waitForTimeout(500);
    });

    test('find request and accept user', async ({ page }) => {
        test.setTimeout(60000); // Set execution timeout to 1 minute
        let courseFound = false;

        let liElements = await page.locator('li:has(div[data-testid="course-card"])').elementHandles(); // Look for course cards
        let liElementsLength = await page.locator('li:has(div[data-testid="course-card"])').count(); // Count course cards

        if (liElementsLength > 0) { // Continue if courses were found
            courseFound = true;

            // Start going through courses one by one to find the first one with a pending enrollment request
            for (let i = 1; i <= liElementsLength; i++) {
                let liElement = page.locator(`li:has(div[data-testid="course-card"]):nth-child(${i})`); // Locate the i-th course card

                await liElement.click();
                await page.waitForLoadState();  // Ensure the page is loaded
                //liElements = await page.locator('li:has(div[data-testid="course-card"])').elementHandles();  // Re-locate the course cards

                let currentUrl = page.url();
                let courseId = currentUrl.replace(`${BASE_URL}/courses/`, '');
                console.log("Course ID: " + courseId);

                const enrollmentsTab = page.locator('a:has-text("Enrollments")');
                if (enrollmentsTab) {
                    await enrollmentsTab.click();
                    await expect(enrollmentsTab).toHaveClass('tab tab-active'); // Make sure Enrollments tab is selected
                }

                try {
                    await page.waitForSelector('li:has(button:has-text("Accept"))', { state: 'attached', timeout: 5000 });
                } catch (error) {
                    console.log("No enrollment requests found. Returning to Dashboard and trying again.\n");
                }

                await page.waitForLoadState();
                const noEnrollments = page.locator('text="No enrollments available"'); // This text is visible if there are no requests

                if (!(await noEnrollments.isVisible())) { // Continue if "no enrollments" text wasn't found
                    console.log("Enrollment request was found.");
                    const liElements = await page.$$('li');
                    let firstPendingRequest;

                    for (let li of liElements) {
                        const acceptButton = await li.$('button:has-text("Accept")');
                        if (acceptButton) {
                            firstPendingRequest = li;
                            break;
                        }
                    }

                    if (firstPendingRequest) { // First request was located
                        const studentIdElement = await firstPendingRequest.$('p'); // Find the <p> element
                        const studentIdElementText = await studentIdElement?.innerText(); // <p> element contains student id
                        studentId = studentIdElementText.split(': ')[1];
                        
                        // Find Accept button & click
                        const acceptButton = await firstPendingRequest.$('button:has-text("Accept")');
                        await acceptButton?.click();
                        console.log(`Enrollment accepted for student with ID: ${studentId}`);
                        break;
                    }
                } else {
                    page.goBack(); // Return to Dashboard and try again
                }
            }
        } else {
            expect(courseFound, 'Dashboard contains no courses').toBeTruthy();
        }
    });

/* WORK IN PROGRESS
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