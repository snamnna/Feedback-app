import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("delete course with feedback", () => {
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

    //try to delete lecture with feedback
    const lectureCard = page.getByTestId("lecture-card").first();
    expect(lectureCard.isVisible).toBeTruthy();

    // get the text inside the h2 tag in lectureCard
    const lectureName = lectureCard.getByRole("heading", {
      name: "Lecture 1: Complex Numbers",
    });

    await expect(lectureName.isVisible).toBeTruthy();

    await page.getByText("delete", { exact: true }).first().click();

    // Expectation for the error message
    const cannotDeleteText = await page.getByText(
      "Cannot delete lecture with feedback"
    );

    expect(cannotDeleteText).toBeTruthy();

    // Make sure the lecture is not removed
    expect(
      await page.isVisible("text=Lecture 1: Complex NumbersView feedbackdelete")
    ).toBeTruthy();
  });
});
