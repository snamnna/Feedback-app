import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("renders register page correctly", async ({ page }) => {
    const loginFooter = page.getByText("Need an Account?");
    expect(loginFooter).toContainText("Need an Account?");
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

    await page.getByText("Username").fill("test");
    await page.getByText("Password:", { exact: true }).fill("test");
    await page.getByText("Confirm Password:").fill("test");
    await page.getByText("Sign Up").click();

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
    await page.getByText("Password:", { exact: true }).fill("test");
    await page.getByText("Confirm Password:").fill("test");
    await page.getByText("Sign Up").click();

    const error = page.getByText("Registration Failed");
    expect(error.isVisible).toBeTruthy();
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
    await page.getByText("Password:", { exact: true }).fill("test");
    await page.getByText("Confirm Password:").fill("test");

    await page.getByText("Sign Up").click();

    expect(
      page.getByRole("heading", {
        name: "You have successfully registered.",
      }).isVisible
    ).toBeTruthy();

    const signInLink = page.getByRole("link", {
      name: "Sign in to your account",
    });

    expect(signInLink).toBeVisible();

    signInLink.click();

    await page.waitForURL(`${BASE_URL}/Login`);

    expect(page.getByText("Username").isVisible).toBeTruthy();
    expect(page.getByText("Password").isVisible).toBeTruthy();
    expect(page.getByText("login").isVisible).toBeTruthy();

    // test that the user can login with the credentials they just registered with
    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password").fill("test");
    await page.getByRole("button", { name: "login" }).click();

    await page.waitForURL(BASE_URL);

    expect(page.getByText("log out").isVisible).toBeTruthy();
    expect(page.getByText("FeedbackApp").isVisible).toBeTruthy();
    expect(page.getByText("My Courses").isVisible).toBeTruthy();
  });
});
