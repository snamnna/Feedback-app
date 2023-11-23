import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("delete course with  no feedback", () => {
  test("navigate and delete", async ({ page }) => {
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

    // open add lecture modal
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();
    const addLectureMenuItem = page.getByText("Add lecture", { exact: true });
    expect(addLectureMenuItem).toBeVisible();

    // open add lecture modal
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

    // create new lecture
    await page
      .locator("#new_lecture_modal")
      .getByPlaceholder("name")
      .fill("new lecture");
    await page
      .locator("#new_lecture_modal")
      .getByRole("button", { name: "Create" })
      .click();

    await page.goto("http://localhost:3000/courses/2");

    //check that the lecture exists
    expect(
      page.getByText("new lectureView feedbackdelete").isVisible
    ).toBeTruthy();

    const lectureCard = page.getByTestId("lecture-card").last();
    expect(lectureCard.isVisible).toBeTruthy();

    // get the text inside the h2 tag in lectureCard
    const lectureName = lectureCard.getByRole("heading", {
      name: "new lecture",
    });
    expect(lectureName.isVisible).toBeTruthy();
    expect(await lectureName.textContent()).toEqual("new lecture");

    await page.getByText("delete", { exact: true }).last().click();

    await page.reload();

    //make sure the lecture is removed
    expect(
      await page.getByText("new lectureView feedbackdelete").isVisible()
    ).not.toBeTruthy();
  });
});
