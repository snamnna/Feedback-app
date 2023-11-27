import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("uusiNimi");
    await page.getByLabel("Password").fill("Test123456789!");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);

    await page.click('a[href="/user"]');

    await page.waitForURL(`${BASE_URL}/user`);

    expect(
      page.getByRole("heading", { name: "User Settings" }).isVisible
    ).toBeTruthy();
  });

  test("should display an error message if username is less than 4 characters", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "te");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "Test123456789!");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123456789!");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should display an error message if new password does not meet the requiments", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "Nimi");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "Test123456789?");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123456789?");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should display an error message if passwords do not match", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "Nimi");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "Test123456789!");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123456789");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should display an error message if new name is empty", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "Test123456789!");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123456789!");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should display an error message if one of the password boxes is empty", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "Nimi");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123456789!");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should display an error message if both of the password boxes are empty", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "Nimi");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "");

    await page.getByRole("button", { name: "Edit User" }).click();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
      await dialog.accept();
    });
  });

  test("should change name and password with valid credentials", async ({
    page,
  }) => {
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "Nimi10");
    await page.waitForSelector("input#newPassword");
    await page.fill("input#newPassword", "Test123!");
    await page.waitForSelector("input#confirmPassword");
    await page.fill("input#confirmPassword", "Test123!");

    await page.getByRole("button", { name: "Edit User" }).click();

    const newNameInputElement = await page.$("input#newName");
    const newNameInputPlaceholder =
      await newNameInputElement.getAttribute("placeholder");
    expect(newNameInputPlaceholder).toBe("New Username");

    const newPasswordInputElement = await page.$("input#newPassword");
    const newPasswordInputPlaceholder =
      await newPasswordInputElement.getAttribute("placeholder");
    expect(newPasswordInputPlaceholder).toBe("New password");

    const confirmPasswordInputElement = await page.$("input#confirmPassword");
    const confirmPasswordInputPlaceholder =
      await confirmPasswordInputElement.getAttribute("placeholder");
    expect(confirmPasswordInputPlaceholder).toBe("Confirm Password:");
  });
});
