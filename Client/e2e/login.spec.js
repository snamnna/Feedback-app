import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should login with valid credentials and redirect to localhost:3000", async ({
    page,
  }) => {
    await page.waitForURL(`${BASE_URL}/login`);

    await page.getByLabel("Username").fill("test");
    await page.getByLabel("Password").fill("test");

    await page.getByRole("button", { name: "login" }).click();

    await page.waitForURL(BASE_URL);

    expect(await page.isVisible("text=log out")).toBeTruthy();
    expect(await page.isVisible("text=FeedbackApp")).toBeTruthy();
    expect(await page.isVisible("text=My Courses")).toBeTruthy();
  });

  test("should display an error message when logging in with invalid credentials", async ({
    page,
  }) => {
    await page.waitForURL(`${BASE_URL}/login`);

    await page.getByLabel("Username").fill("test");
    await page.getByLabel("Password").fill("wrongpassword");

    await page.getByRole("button", { name: "login" }).click();

    expect(page.getByText("Unauthorized").isVisible).toBeTruthy();
  });
});
