import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Check user feedback", () => {
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

    await page.click('button:has-text("View feedback")');
    await page.waitForURL(`http://localhost:3000/lectures/2`);

    await page.waitForSelector('text="User: 4"');
    await page.click('text="User: 4"');
    //click the link with user id
    await page.waitForURL(`http://localhost:3000/feedback/4`);

    await page.waitForSelector("#statistics");

    // Check if the feedback list is visible
    const feedbackListExists = await page.isVisible("#feedbackList");

    expect(feedbackListExists).toBeTruthy();
  });
});
