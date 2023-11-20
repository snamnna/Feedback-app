import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Enroll into a Course", () => {
  test("enroll into a course", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "student1");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    await page.waitForSelector("input#courseSearch");
    await page.fill("input#courseSearch", "Etesti");

    await page.click("#course-147");

    await page.click("button#req-btn");

    // Capture the initial state of enrollBtn
    const initialEnrollBtnState = await page.$eval(
      "#req-btn",
      (button) => button.disabled
    );

    // Click the enrollment request button
    await page.click("button#req-btn");

    // Wait for a short duration to allow the state to update
    await page.waitForTimeout(1000);

    // Capture the updated state of enrollBtn
    const updatedEnrollBtnState = await page.$eval(
      "#req-btn",
      (button) => button.disabled
    );

    // Assert that the enrollment request was sent successfully
    expect(initialEnrollBtnState).toBe(true); // Assuming the button was initially disabled
    expect(updatedEnrollBtnState).toBe(false); // Assuming the button is enabled after successful enrollment
  });
});
