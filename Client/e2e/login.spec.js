import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should login with valid credentials and redirect to localhost:3000", async ({
    page,
  }) => {
    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "teacher2");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    // Submit the form
    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);
    await page.waitForURL(BASE_URL);

    expect(await page.isVisible("text=log out")).toBeTruthy();
    expect(await page.isVisible("text=TeachWise")).toBeTruthy();
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
