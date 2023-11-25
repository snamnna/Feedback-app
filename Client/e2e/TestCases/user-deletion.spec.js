import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("Nimi10");
    await page.getByLabel("Password").fill("Test123!");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);

    await page.click('a[href="/user"]');

    await page.waitForURL(`${BASE_URL}/user`);

    expect(
      page.getByRole("heading", { name: "User Settings" }).isVisible
    ).toBeTruthy();
  });

  test("Cancel user deletion", async ({ page }) => {
    // Klikkaa "DELETE USER" -nappia
    await page.getByRole("button", { name: "DELETE USER" }).click();

    // Odota, että vahvistusteksti on näkyvissä
    await page.waitForSelector(
      'p:has-text("Are you sure you want to delete this user?")'
    );

    // Varmista, että vahvistusteksti on oikea
    const confirmationText = await page.textContent(
      'p:has-text("Are you sure you want to delete this user?")'
    );
    expect(confirmationText).toBe("Are you sure you want to delete this user?");

    // Klikkaa "NO" -nappia peruttaaksesi käyttäjän poiston
    await page.getByRole("button", { name: "NO" }).click();

    // Odotetaan, että vahvistusteksti ei ole enää näkyvissä
    await page.waitForSelector(
      'p:has-text("Are you sure you want to delete this user?")',
      { state: "hidden" }
    );

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

  test("Delete user account", async ({ page }) => {
    await page.getByRole("button", { name: "DELETE USER" }).click();

    await page.waitForSelector(
      'p:has-text("Are you sure you want to delete this user?")'
    );

    // Ensure the selected text is correct
    const selectedText = await page.textContent(
      'p:has-text("Are you sure you want to delete this user?")'
    );
    expect(selectedText).toBe("Are you sure you want to delete this user?");

    await page.getByRole("button", { name: "YES" }).click();

    expect(page.url()).toBe(`${BASE_URL}/login`);
  });
});
