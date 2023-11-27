import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("renders register page correctly", async ({ page }) => {
    const loginFooter = page.getByText("Need an Account?");
    expect(loginFooter).toContainText("Need an account?Register");
    expect(loginFooter).toBeVisible();

    const registerLink = page.getByRole("link", { name: "Register" });
    expect(registerLink).toBeVisible();
    await registerLink.click();

    await page.waitForURL(`${BASE_URL}/register`);

    expect(
      page.getByRole("heading", { name: "Register" }).isVisible
    ).toBeTruthy();

    expect(page.getByText("Username").isVisible).toBeTruthy();
    expect(page.getByText("Password:", { exact: true }).isVisible).toBeTruthy();
    expect(page.getByText("Confirm Password:").isVisible).toBeTruthy();
    expect(page.getByText("Sign Up").isVisible).toBeTruthy();

    expect(page.getByText("Already registered?").isVisible).toBeTruthy();
    expect(page.getByRole("link", { name: "Sign In" }).isVisible).toBeTruthy();
  });

  test("should display an error message if username is taken", async ({
    page,
  }) => {
    const registerLink = page.getByRole("link", { name: "Register" });
    expect(registerLink).toBeVisible();
    await registerLink.click();

    await page.waitForURL(`${BASE_URL}/register`);

    await page.getByText("Username").fill("uusiNimi");
    await page.getByText("Password:", { exact: true }).fill("Test123456789!");
    await page.getByText("Confirm Password:").fill("Test123456789!");
    await page.click("button#reg-btn");

    const error = page.getByText("Username Taken");

    expect(error.isVisible).toBeTruthy();
  });

  test("should display an error message if username is less than 3 characters", async ({
    page,
  }) => {
    const registerLink = page.getByRole("link", { name: "Register" });
    expect(registerLink).toBeVisible();
    await registerLink.click();

    await page.waitForURL(`${BASE_URL}/register`);

    await page.getByText("Username").fill("te");
    await page.getByText("Password:", { exact: true }).fill("Test123456789!");
    await page.getByText("Confirm Password:").fill("Test123456789!");

    //submit button disabled if conditions not mer
    const button = await page.$("#reg-btn");
    const isDisabled = await button.isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test("should register with valid credentials and redirect to '/'", async ({
    page,
  }) => {
    const registerLink = page.getByRole("link", { name: "Register" });
    expect(registerLink).toBeVisible();
    await registerLink.click();

    await page.waitForURL(`${BASE_URL}/register`);

    // generate random username
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

    // test that the user can log in with the credentials they just registered with
    await page.getByText("Username").fill(username);
    await page.getByLabel("Password").fill("Test123456789!");
    await page.click("button#submit-btn");

    await page.waitForURL(BASE_URL);

    await page.screenshot({ path: "screenshot.png" });

    expect(page.getByText("log out").isVisible).toBeTruthy();
    expect(page.getByText("TeachWise").isVisible).toBeTruthy();
    expect(page.getByText("My Courses").isVisible).toBeTruthy();
  });
});
