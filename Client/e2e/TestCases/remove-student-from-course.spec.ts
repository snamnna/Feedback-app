import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:3000";

test.describe("Teacher feature: remove student from a course", () => {

/**
 * 
 * PREREQUISITES for the test to pass:
 * 
 * - user with ID 4 has to be student
 * - user with ID 4 needs to be enrolled on the course with ID 83 (called "abcdef")
 * 
 * - user with ID 3 has to be teacher
 * - user with ID 3 needs to be lecturer of the course with ID 83 (called "abcdef")
 * 
 */
    
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
    
    test('select course and remove student', async ({ page }) => {

        const studentToRemove = 4; // Remove student with ID number 4
        let enrolledStudents = false;
        let studentRemoved = false;

        // Select course and go to participants tab
        await page.click("#course-83");
        expect.soft(page, 'wrong course').toHaveURL(`${BASE_URL}/courses/83`);

        const participantsTab = page.locator('a:has-text("Participants")');
        if (participantsTab) {
            await participantsTab.click();
            await expect(participantsTab).toHaveClass('tab tab-active'); // Make sure Participants tab is selected
            await page.waitForLoadState();  // Ensure the page is loaded
        }

        try {
            await page.waitForSelector('li:has(button:has-text("remove student"))', { state: 'attached', timeout: 5000 });
            enrolledStudents = true; // Participants list has students
        } catch (error) {
            expect(enrolledStudents, 'Course has no participants').toBeTruthy();
        }

        if (enrolledStudents) {
            expect(enrolledStudents).toBeTruthy();
            
            try {
                // Look for list element with a removal button (indication for student) and contains correct ID
                await page.waitForSelector(`li:has(button:has-text("remove student")):has-text("id: ${studentToRemove}")`, { state: 'attached', timeout: 5000 });
                let participantsLiElement = page.locator(`li:has(button:has-text("remove student")):has-text("id: ${studentToRemove}")`);

                if (participantsLiElement) {

                    const participantDetails = participantsLiElement.locator('p');  // <p> element contains student id
                    const participantDetailText = await participantDetails.innerText();
                    const match = participantDetailText.match(/id: (\d+)/); // Get only the ID number from innertext

                    if (match) {
                        let compareStudentId = parseInt(match[1], 10);
                    
                        // Confirm that IDs match & remove student
                        if (compareStudentId === studentToRemove) {
                            const removeButton = participantsLiElement.locator('button:has-text("remove student")');
                            await removeButton.click();
                            studentRemoved = true;
                            console.log(`Student with ID ${studentToRemove} removed from the course`);
                        }
                    } else {
                        console.error(`Could not extract student ID from text: ${participantDetailText}`);
                    }
                }
            } catch {
                console.log(`Student with ID ${studentToRemove} is not on the course`);
            }
        }
        
        // Lastly check that student has left the course
        if (studentRemoved) { // Check only if a removal was done
            let removeSuccessful = true;
            page.reload();
            await participantsTab.click();
            await expect(participantsTab).toHaveClass('tab tab-active'); // Make sure Participants tab is selected

            try {
                await page.waitForSelector(`li:has(button:has-text("remove student")):has-text("id: ${studentToRemove}")`, { state: 'attached', timeout: 5000 });
                let participantsLiElement = page.locator(`li:has(button:has-text("remove student")):has-text("id: ${studentToRemove}")`);

                if (participantsLiElement) {
                    removeSuccessful = false;
                    console.log(`Error: Student with ID ${studentToRemove} still found in the participants list after removal.`);
                } else {
                    removeSuccessful = true;
                }
            } catch {
                console.log('Removal was successful');
            }
            expect(removeSuccessful, 'removal failed').toBeTruthy();
        }
    });
});
