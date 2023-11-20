import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Delete course with no feedback", () => {
  test("delete", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "teacher2");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    // Submit the form
    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    //Create course to delete
    await page.getByRole("button", { name: "New Course" }).click();

    let courseName;
    let courseDescription;

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

    //check the course is created correctly
    expect(
      page.getByText(`${courseName}${courseDescription}`).isVisible
    ).toBeTruthy();

    expect(
      page.getByRole("heading", { name: courseName }).isVisible
    ).toBeTruthy();

    //navigate to the course details page
    await page.getByText(`${courseName}${courseDescription}`).first().click();

    //open the dropdown
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();

    //click the delete course
    await page.getByText("Delete course").click();

    //navigate to homepage
    await page.waitForURL(BASE_URL);

    //check if the course is deleted correctly
    expect(page.getByText("My Courses").isVisible).toBeTruthy();
    await page.reload();
    expect(
      await page.getByRole("heading", { name: courseName }).first().isVisible()
    ).toBeFalsy();
  });
});
