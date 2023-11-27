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

  test("should create a new lecture", async ({ page }) => {
    // Click on a specific course based on its ID
    await page.click("#course-2");

    // Search for the element
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();
    const addLectureMenuItem = page.getByText("Add lecture", { exact: true });
    expect(addLectureMenuItem).toBeVisible();

    // Open add lecture modal
    await addLectureMenuItem.click();
    expect(
      page.getByRole("heading", { name: "Add Lecture" }).isVisible
    ).toBeTruthy();

    expect(
      page.locator("#new_lecture_modal").getByPlaceholder("name").isVisible
    ).toBeTruthy();

    expect(
      page.locator("#new_lecture_modal").getByRole("button", { name: "Create" })
        .isVisible
    ).toBeTruthy();

    // Create new lecture
    await page
      .locator("#new_lecture_modal")
      .getByPlaceholder("name")
      .fill("new lecture");
    await page
      .locator("#new_lecture_modal")
      .getByRole("button", { name: "Create" })
      .click();

    await page.goto("http://localhost:3000/courses/2");

    expect(
      page.getByText("new lectureView feedbackdelete").isVisible
    ).toBeTruthy();

    expect(
      page.getByRole("heading", { name: "No feedbacks yet" }).isVisible
    ).toBeTruthy();

    await page.goto("http://localhost:3000/courses/2");

    expect(
      page.getByText("new lectureView feedbackdelete").isVisible
    ).toBeTruthy();

    /*
    await page
      .locator("li")
      .filter({ hasText: "new lectureView feedbackdelete" })
      .getByRole("button")
      .click();
      */
  });
});
