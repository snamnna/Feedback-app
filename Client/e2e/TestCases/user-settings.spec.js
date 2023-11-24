import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("uusiNimi");
    await page.getByLabel("Password").fill("Test123456789!");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);

    await page.getByText("U").first().click();

    await page.waitForURL(`${BASE_URL}/user`);

    expect(
      page.getByRole("heading", { name: "User Settings" }).isVisible
    ).toBeTruthy();
  });

  test("should display an error message if username is less than 4 characters", async ({
    page,
  }) => {
    // Tässä tapahtumankäsittelijä, joka ottaa haltuunsa alert-viestit
    let alertMessage;
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss(); // Sulkee alertin
    });

    // Tämä varmistaa, että alert-viesti odotetaan ja sitten tarkistetaan
    await page.waitForSelector("input#newName");
    await page.fill("input#newName", "te");
    await page
      .getByText("New password", { exact: true })
      .fill("Test123456789!");
    await page.getByText("Confirm password:").fill("Test123456789!");

    await page.getByRole("button", { name: "Edit User" }).click();

    // Odotetaan, että alert-viesti näkyy
    await page.waitFor(() => alertMessage !== undefined);

    // Tee tarvittavat tarkistukset alert-viestin sisällöstä
    expect(alertMessage).toContain(
      "Please fill in both new name and password and ensure they meet the requirements."
    );

    // Tyhjennä alert-viestin muuttuja seuraavia testejä varten
    alertMessage = undefined;
  });

  test("should display an error message if new password does not meet the requiments", async ({
    page,
  }) => {
    let alertMessage;
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await page.waitForSelector("input#uusiNimi");
    await page.fill("input#newName", "uusiNimi");
    await page.getByText("New password", { exact: true }).fill("Testi123?");
    await page.getByText("Confirm password:").fill("Testi123?");

    await page.getByRole("button", { name: "Edit User" }).click();

    await page.waitFor(() => alertMessage !== undefined);
    expect(alertMessage).toContain(
      "New password does not meet the requirements"
    );

    alertMessage = undefined;
  });

  test("should display an error message if passwords do not match", async ({
    page,
  }) => {
    let alertMessage;
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await page.waitForSelector("input#uusiNimi");
    await page.fill("input#newName", "uusiNimi");
    await page.getByText("New password", { exact: true }).fill("Test12345!");
    await page.getByText("Confirm password:").fill("Test123!");

    await page.getByRole("button", { name: "Edit User" }).click();

    await page.waitFor(() => alertMessage !== undefined);
    expect(alertMessage).toContain("Passwords do not match");

    alertMessage = undefined;
  });

  test("should display an error message if passwords does not match", async ({
    page,
  }) => {
    let alertMessage;
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await page.waitForSelector("input#uusiNimi");
    await page.fill("input#newName", "uusiNimi");
    await page.getByText("New password", { exact: true }).fill("Test12345!");
    await page.getByText("Confirm password:").fill("Test123!");

    await page.waitFor(() => alertMessage !== undefined);
    expect(alertMessage).toContain("Passwords do not match");

    alertMessage = undefined;
  });

  test("should change name and password with valid credentials", async ({
    page,
  }) => {
    const newNameInput = await page.getByText("New Username");
    const newPasswordInput = await page.getByText("New password", {
      exact: true,
    });
    const confirmPasswordInput = await page.getByText("Confirm password:");

    // Täytä inputit
    await newNameInput.fill("uusiNimi10");
    await newPasswordInput.fill("Test123!");
    await confirmPasswordInput.fill("Test123!");

    // Klikkaa "Edit User" -nappia
    await page.getByRole("button", { name: "Edit User" }).click();

    // Odotetaan, että inputit ovat tyhjiä tai sisältävät placeholder-arvot
    await expect(newNameInput).toHaveValue("");
    await expect(newPasswordInput).toHaveValue("");
    await expect(confirmPasswordInput).toHaveValue("");
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

    // Varmista, että tekstikentät ovat odotetussa tilassa
    const newNameInput = await page.waitForSelector("input#newName");
    const newPasswordInput = await page.getByText("New password", {
      exact: true,
    });
    const confirmPasswordInput = await page.getByText("Confirm password:");

    await expect(newNameInput).toHaveValue("");
    await expect(newPasswordInput).toHaveValue("");
    await expect(confirmPasswordInput).toHaveValue("");
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
