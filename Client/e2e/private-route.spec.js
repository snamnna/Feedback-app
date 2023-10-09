import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Private route", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("should be redirected to /login when not logged in", async ({
    page,
  }) => {
    await page.waitForURL(`${BASE_URL}/login`);
    expect(page).toHaveURL(`${BASE_URL}/login`);
    expect(await page.isVisible("text=Username")).toBeTruthy();
    expect(await page.isVisible("text=Password")).toBeTruthy();
    expect(page.getByText("login")).toBeTruthy();
  });
});
