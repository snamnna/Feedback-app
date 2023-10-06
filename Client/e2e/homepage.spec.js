import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("teacher2");
    await page.getByLabel("Password").fill("test");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);
  });

  test("should render homepage and courses correctly", async ({ page }) => {
    expect(
      page.getByRole("link", { name: "FeedbackApp" }).isVisible
    ).toBeTruthy();

    expect(
      page.getByRole("button", { name: "Log out" }).isVisible
    ).toBeTruthy();

    expect(page.getByText("My CoursesNew Course").isVisible).toBeTruthy();

    expect(
      page.getByRole("button", { name: "New Course" }).isVisible
    ).toBeTruthy();

    expect(
      page.getByPlaceholder("Search from all courses").isVisible
    ).toBeTruthy();

    expect(
      page.getByText(
        "Find new courses and enroll to them by searching the course by name and clicking"
      ).isVisible
    ).toBeTruthy();

    expect(
      page
        .getByText("Advanced MathematicsAn advanced course on mathematics")
        .first().isVisible
    ).toBeTruthy();

    expect(
      page.getByRole("heading", { name: "Advanced Mathematics" }).first()
        .isVisible
    ).toBeTruthy();

    expect(
      page.getByText("An advanced course on mathematics").first().isVisible
    ).toBeTruthy();
  });

  let courseName;
  let courseDescription;

  test("should create a new course and display it", async ({ page }) => {
    await page.getByRole("button", { name: "New Course" }).click();
    courseName = Math.random().toString(36).substring(7);
    courseDescription = Math.random()
      .toString(36)
      .substring(7)
      .repeat(6)
      .substring(0, 32);
    await page
      .locator("#new_course_modal")
      .getByPlaceholder("name")
      .fill(courseName);

    await page
      .locator("#new_course_modal")
      .getByPlaceholder("Description")
      .fill(courseDescription);

    await page
      .locator("#new_course_modal")
      .getByRole("button", { name: "Create" })
      .click();

    expect(
      page.getByText(`${courseName}${courseDescription}`).isVisible
    ).toBeTruthy();

    expect(
      page.getByRole("heading", { name: courseName }).isVisible
    ).toBeTruthy();
  });

  test("should delete a course", async ({ page }) => {
    await page.getByText(`${courseName}${courseDescription}`).first().click();
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();
    await page.getByText("Delete course").click();
    await page.waitForURL(BASE_URL);

    expect(page.getByText("My Courses").isVisible).toBeTruthy();
    await page.reload();
    expect(
      await page.getByRole("heading", { name: courseName }).first().isVisible()
    ).toBeFalsy();
  });
});
