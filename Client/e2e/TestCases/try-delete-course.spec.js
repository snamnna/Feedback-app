import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("delete lecture with feedback", () => {
  test("navigate and try to delete", async ({ page }) => {
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

    await page.waitForURL(`${BASE_URL}/courses/2`);

    await page.getByText("Details for Advanced Mathematics");

    //open the dropdown
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();

    //click the delete course
    await page.getByText("Delete course").click();

    // Expectation for the error message
    const cannotDeleteText = await page.getByText(
      "Cannot delete course with existing feedback"
    );

    expect(cannotDeleteText).toBeTruthy();

    //check the course is not deleted
    expect(page.getByText("My Courses").isVisible).toBeTruthy();

    await page.reload();
    expect(
      page.getByRole("heading", { name: "Advanced Mathematics" }).isVisible
    ).toBeTruthy();
  });
});
