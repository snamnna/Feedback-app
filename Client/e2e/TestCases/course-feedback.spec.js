import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Check lecture feedback", () => {
  test("open the lecture feedback", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "teacher2");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    // Submit the form (assuming there's a submit button)
    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    // Click on a specific course based on its ID
    await page.click("#course-2");

    // Wait that the link can be found and click
    await page.waitForSelector('a:has-text("Feedback")', { visible: true });
    await page.click('a:has-text("Feedback")');

    await page.waitForURL("http://localhost:3000/courses/2");

    // Wait that the elements are available
    await page.waitForSelector("#coursefeedbacklist");

    // Search all li elements of the list
    const feedbackListItems = await page.$$("#coursefeedbacklist li");

    // Check that there are element(s) in the list
    expect(feedbackListItems.length).toBeGreaterThan(0);
  });
});
