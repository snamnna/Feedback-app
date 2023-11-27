import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "uusiNimi");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "Test123456789!");

    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    await page.click('a[href="/user"]');

    await page.waitForURL(`${BASE_URL}/user`);

    await page.click('a[href="/user"]');

    await page.waitForURL(`${BASE_URL}/user`);

    const elementId = "user-set";

    const isElementVisible = await page.$eval(`#${elementId}`, (element) => {
      return element !== null && element.offsetParent !== null;
    });

    expect(isElementVisible).toBeTruthy();
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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

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

    await page.click("button#edit-user-btn");

    // Tarkista, että newName-kentän arvo on tyhjä
    const newNameInputElement = await page.$("input#newName");
    const newNameInputValue = await newNameInputElement.evaluate(
      (el) => el.value
    );
    expect(newNameInputValue).toBe(""); // Varmista, että arvo on tyhjä

    // Tarkista, että newPassword-kentän arvo on tyhjä
    const newPasswordInputElement = await page.$("input#newPassword");
    const newPasswordInputValue = await newPasswordInputElement.evaluate(
      (el) => el.value
    );
    expect(newPasswordInputValue).toBe(""); // Varmista, että arvo on tyhjä

    // Tarkista, että confirmPassword-kentän arvo on tyhjä
    const confirmPasswordInputElement = await page.$("input#confirmPassword");
    const confirmPasswordInputValue =
      await confirmPasswordInputElement.evaluate((el) => el.value);
    expect(confirmPasswordInputValue).toBe("");
  });
});
