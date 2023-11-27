import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);

    // Wait for the username input field to be ready before filling it
    await page.waitForSelector("input#username");
    await page.fill("input#username", "Nimi10");

    // Wait for the password input field to be ready before filling it
    await page.waitForSelector("input#password");
    await page.fill("input#password", "Test123!");

    await page.click("button#submit-btn");
    await page.waitForURL(`${BASE_URL}`);

    await page.click('a[href="/user"]');

    await page.waitForURL(`${BASE_URL}/user`);

    const elementId = "user-set";

    const isElementVisible = await page.$eval(`#${elementId}`, (element) => {
      return element !== null && element.offsetParent !== null;
    });

    expect(isElementVisible).toBeTruthy();
  });

  test("Cancel user deletion", async ({ page }) => {
    // Klikkaa "DELETE USER" -nappia
    await page.click("button#del-user-btn");

    // Odota, että vahvistusteksti on näkyvissä
    const elementId = "del-conf";

    const isElementVisible = await page.$eval(`#${elementId}`, (element) => {
      return element !== null && element.offsetParent !== null;
    });

    expect(isElementVisible).toBeTruthy();

    // Klikkaa "NO" -nappia peruttaaksesi käyttäjän poiston
    await page.click("button#del-conf-no");

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

  test("Delete user account", async ({ page }) => {
    await page.click("button#del-user-btn");

    // Odota, että vahvistusteksti on näkyvissä
    const elementId = "del-conf";

    const isElementVisible = await page.$eval(`#${elementId}`, (element) => {
      return element !== null && element.offsetParent !== null;
    });

    expect(isElementVisible).toBeTruthy();

    await page.click("button#del-conf-yes");

    expect(page.url()).toBe(`${BASE_URL}/login`);
  });
});
