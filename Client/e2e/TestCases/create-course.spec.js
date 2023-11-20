import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("create course", () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("teacher2");
    await page.getByLabel("Password").fill("test");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);
  });

  // Testataan kurssin luominen
  test("should create a new course and display it", async ({ page }) => {
    // Open new course modal
    await page.getByRole("button", { name: "New Course" }).click();
    // Generate random course name and description
    courseName = Math.random().toString(36).substring(7);
    courseDescription = Math.random()
      .toString(36)
      .substring(7)
      .repeat(6)
      .substring(0, 32);

    // Fill course name and description
    await page
      .locator("#new_course_modal")
      .getByPlaceholder("name")
      .fill(courseName);

    await page
      .locator("#new_course_modal")
      .getByPlaceholder("Description")
      .fill(courseDescription);

    // Create course with pressing create button
    await page
      .locator("#new_course_modal")
      .getByRole("button", { name: "Create" })
      .click();

    // Check that course can be seen
    expect(
      page.getByText(`${courseName}${courseDescription}`).isVisible
    ).toBeTruthy();

    // Check that course name and description are correctly showed
    expect(
      page.getByRole("heading", { name: courseName }).isVisible
    ).toBeTruthy();
  });
});
