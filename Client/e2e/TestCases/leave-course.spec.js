import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Leave the course", () => {
  test("leave the course", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "student1");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    // Click on a specific course based on its ID
    await page.click("#course-150");

    await page.click("button#leaveCourse");

    await page.click("#teachwise");

    const course = await page.$("#course-150");
    expect(course).toBeNull();
  });
});
