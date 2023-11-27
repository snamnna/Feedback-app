import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("give role to user", () => {
  test("register new user and give role", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    //register new user
    const registerLink = page.getByRole("link", { name: "Register" });
    expect(registerLink).toBeVisible();
    await registerLink.click();

    await page.waitForURL(`${BASE_URL}/register`);

    // generate random username for student to give role to
    const username = Math.random().toString(36).substring(7);

    await page.getByText("Username").fill(username);
    await page.getByText("Password:", { exact: true }).fill("Test123456789!");
    await page.getByText("Confirm Password:").fill("Test123456789!");

    await page.click("button#reg-btn");

    expect(
      page.getByRole("heading", {
        name: "You have successfully registered.",
      }).isVisible
    ).toBeTruthy();

    await page.waitForSelector("a#sign-btn");

    // Click the sign-in link
    await page.click("a#sign-btn");

    await page.waitForURL(`${BASE_URL}/Login`);

    expect(page.getByText("Username").isVisible).toBeTruthy();
    expect(page.getByText("Password").isVisible).toBeTruthy();
    expect(page.getByText("login").isVisible).toBeTruthy();

    // log in to admin user
    await page.waitForSelector("input#username");
    await page.fill("input#username", "admin");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "test");

    // Submit the form
    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    await page.waitForURL(BASE_URL);

    expect(page.getByText("log out").isVisible).toBeTruthy();

    await page.waitForSelector("#admin-btn"); // Ensure admin button is present
    const adminButton = await page.$("#admin-btn");
    await adminButton.click();

    await page.waitForURL(`${BASE_URL}/admin`);
    expect(page.getByText("User Search"));

    // Wait for the input field to be present
    const inputField = await page.$("input#user-search");
    await inputField.fill(username);

    // Click the submit button
    await page.click("button#search-btn");

    await expect(page.locator("#role-select")).toBeVisible();

    const selectElement = await page.$("#role-select");
    await selectElement.selectOption({ value: "TEACHER" });

    const submitButton = await page.$("#role-sbmt-btn");
    await submitButton.click();

    page.on("dialog", async (dialog) => {
      const message = dialog.message();
      expect(message).toEqual("User type changed successfully!");
      await dialog.accept();
    });
  });
});
