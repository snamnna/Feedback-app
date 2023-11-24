import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Feedback", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("student1");
    await page.getByLabel("Password").fill("test");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);

    // open course details page
    await page.getByText("feedbacktest").first().click();

    await page.getByRole("button", { name: "Give feedback" }).click();

    // Ensure the feedback modal is visible
    expect(
      page
        .locator("#feedback_modal")
        .getByRole("heading", { name: "Give Feedback to the lecture" })
        .isVisible
    ).toBeTruthy();

    // Ensure the comment input field is visible
    expect(
      page.locator("#feedback_modal").getByPlaceholder("comment").isVisible
    ).toBeTruthy();
  });

  test.describe("Give a great feedback", () =>
    test("Give a great feedback", async ({ page }) => {
      const greatBtnSelector = 'button[style*="background-color: green"]';

      // Click the green button
      await page.click(greatBtnSelector);

      // Wait for the text "You have selected GREAT" to appear
      await page.waitForSelector('p:has-text("You have selected GREAT")');

      // Ensure the selected text is correct
      const selectedText = await page.textContent(
        'p:has-text("You have selected GREAT")'
      );
      expect(selectedText).toBe("You have selected GREAT");

      await page.waitForSelector("input#comment");
      await page.fill("input#comment", "feedback");

      // Get the length of the entered text and assert it
      const commentLength = await page.$eval(
        "input#comment",
        (input) => input.value.length
      );
      expect(commentLength).toBe(8);

      // Mock the Axios post request
      // await page.route("**/feedback-endpoint", (route) => {
      // route.fulfill({
      //   status: 200,
      //  contentType: "application/json",
      //   body: JSON.stringify({ status: "Feedback submitted successfully" }),
      //  });
      // });

      await page.getByRole("button", { name: "Send" }).click();

      // Wait for the button to be disabled
      await page.waitForSelector('button:has-text("Give feedback"):disabled');

      const feedbackBtnState = await page.$eval(
        'button:has-text("Give feedback")',
        (button) => button.disabled
      );

      expect(feedbackBtnState).toBe(true); // Assuming the button is disabled after feedback is sent
    }));
});
