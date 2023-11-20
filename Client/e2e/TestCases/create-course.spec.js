import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test("Create course", async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);

  // Wait for the username input field to be ready before filling it
  await page.waitForSelector("input#username");
  await page.fill("input#username", "teacher2");

  // Wait for the password input field to be ready before filling it
  await page.waitForSelector("input#password");
  await page.fill("input#password", "test");

  // Submit the form (assuming there's a submit button)
  await page.click("button#submit-btn");
  await page.waitForURL(`${BASE_URL}`);

  // Wait that course is created
  await page.click('button:has-text("NEW COURSE")');
  await page.fill("#courseName", "Kurssi123");
  await page.fill("#description", "Kurssi jossa opetellaan laskemaan");

  // Click create button
  await page.click("button#submit-btn");
  await page.waitForURL(`${BASE_URL}`);

  // Checks if the course is created
  await page.goto(`${BASE_URL}`);
  await page.waitForSelector(`a:has-text("Kurssi123")`);
});
