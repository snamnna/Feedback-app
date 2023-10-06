import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("course details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel("Username").fill("teacher2");
    await page.getByLabel("Password").fill("test");
    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL(`${BASE_URL}`);

    // open course details page
    await page
      .getByText("Advanced MathematicsAn advanced course on mathematics")
      .first()
      .click();
  });

  test.describe("modals open correctly", () => {
    test("should open edit course modal", async ({ page }) => {
      await page
        .locator("div")
        .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
        .locator("label")
        .click();
      const editCourseMenuItem = page.getByText("Edit Course", {
        exact: true,
      });
      expect(editCourseMenuItem).toBeVisible();

      // open edit course modal
      await editCourseMenuItem.click();
      expect(
        page.getByRole("heading", { name: "Edit course" }).isVisible
      ).toBeTruthy();

      expect(
        page.locator("#edit_course_modal").getByPlaceholder("name").isVisible
      ).toBeTruthy();

      expect(
        page.locator("#edit_course_modal").getByPlaceholder("Description")
          .isVisible
      ).toBeTruthy();
    });

    test("should open edit lecture modal", async ({ page }) => {
      // open edit lecture modal
      await page
        .locator("li")
        .filter({
          hasText: "Lecture 1: Complex NumbersView feedbackdelete",
        })
        .locator("a")
        .first()
        .click();

      expect(
        page.getByRole("heading", { name: "Edit Lecture" }).isVisible
      ).toBeTruthy();
      expect(
        page.locator("#edit_lecture_modal").getByText("Lecture Name").isVisible
      ).toBeTruthy();
      expect(
        page.locator("#edit_lecture_modal").getByPlaceholder("name").isVisible
      ).toBeTruthy();
    });

    test.describe("tabs open correctly", () => {
      test("should display feedbacks", async ({ page }) => {
        const feedbackTab = page.getByText("Feedback", { exact: true });
        expect(feedbackTab.isVisible()).toBeTruthy();
        await feedbackTab.click();

        const statisticsHeading = page.getByRole("heading", {
          name: "Statistics:",
        });
        const listOfFeedbacks = page.getByRole("heading", {
          name: "List of feedbacks",
        });

        const displayedFeedback = page.getByText(
          "Type: NEUTRALComment: It was okay.Lecture ID: 2"
        );

        expect(statisticsHeading.isVisible).toBeTruthy();
        expect(listOfFeedbacks.isVisible).toBeTruthy();
        expect(displayedFeedback.isVisible).toBeTruthy();
      });

      test("should display participants", async ({ page }) => {
        const participantsTab = page.getByText("Participants", { exact: true });
        expect(participantsTab.isVisible()).toBeTruthy();
        await participantsTab.click();

        expect(
          page.getByRole("heading", { name: "Participants" }).isVisible
        ).toBeTruthy();

        expect(
          page.getByText("Username: student2 id: 5").isVisible
        ).toBeTruthy();

        expect(
          page.locator("li").filter({ hasText: "Username: teacher2 id: 3" })
            .isVisible
        ).toBeTruthy();

        expect(
          page.getByRole("button", { name: "remove student" }).isVisible
        ).toBeTruthy();
      });

      test("should display enrollments", async ({ page }) => {
        await page.getByText("Enrollments").click();
        expect(
          page.getByRole("heading", { name: "Enrollments" }).isVisible
        ).toBeTruthy();
        expect(
          page.getByText("Enrolled students, please accept or reject:")
            .isVisible
        ).toBeTruthy();
        expect(page.getByText("id: 4AcceptDelete").isVisible).toBeTruthy();
      });
    });
  });

  test("should display course lectures", async ({ page }) => {
    expect(
      page.getByRole("heading", { name: "Lectures:" }).isVisible
    ).toBeTruthy();
    expect(
      page.getByText("Lecture 1: Complex NumbersView feedbackdelete").isVisible
    ).toBeTruthy();
  });

  test("should create a new lecture", async ({ page }) => {
    // open add lecture modal
    await page
      .locator("div")
      .filter({ hasText: /^Add lectureEdit CourseDelete course$/ })
      .getByRole("img")
      .click();
    const addLectureMenuItem = page.getByText("Add lecture", { exact: true });
    expect(addLectureMenuItem).toBeVisible();

    // open add lecture modal
    await addLectureMenuItem.click();
    expect(
      page.getByRole("heading", { name: "Add Lecture" }).isVisible
    ).toBeTruthy();

    expect(
      page.locator("#new_lecture_modal").getByPlaceholder("name").isVisible
    ).toBeTruthy();

    expect(
      page.locator("#new_lecture_modal").getByRole("button", { name: "Create" })
        .isVisible
    ).toBeTruthy();

    // create new lecture
    await page
      .locator("#new_lecture_modal")
      .getByPlaceholder("name")
      .fill("new lecture");
    await page
      .locator("#new_lecture_modal")
      .getByRole("button", { name: "Create" })
      .click();

    expect(
      page.getByText("new lectureView feedbackdelete").isVisible
    ).toBeTruthy();

    await page.goto("http://localhost:3000/courses/2");

    expect(
      page.getByText("new lectureView feedbackdelete").isVisible
    ).toBeTruthy();

    await page
      .locator("li")
      .filter({ hasText: "new lectureView feedbackdelete" })
      .getByRole("button")
      .click();

    expect(
      page.getByRole("heading", { name: "No feedbacks yet" }).isVisible
    ).toBeTruthy();
  });

  test("should delete a lecture", async ({ page }) => {
    const lectureCard = page.getByTestId("lecture-card").last();
    expect(lectureCard.isVisible).toBeTruthy();

    // get the text inside the h2 tag in lectureCard
    const lectureName = lectureCard.getByRole("heading", {
      name: "new lecture",
    });
    expect(lectureName.isVisible).toBeTruthy();
    expect(await lectureName.textContent()).toEqual("new lecture");

    await page.getByText("delete", { exact: true }).last().click();

    await page.reload();

    expect(
      await page.getByText("new lectureView feedbackdelete").isVisible()
    ).not.toBeTruthy();
  });
});
