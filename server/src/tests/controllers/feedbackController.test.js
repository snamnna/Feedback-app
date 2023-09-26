const request = require("supertest");
const express = require("express");

const app = express();

jest.timeout(60000);

jest.mock("../../services/feedbackService");
jest.mock("../../middlewares/verifyToken");

const feedbackService = require("../../services/feedbackService");
const verifyToken = require("../../middlewares/verifyToken");

verifyToken.mockImplementation((req, res, next) => next());

const feedbackRoutes = require("../../controllers/feedbackController");
const CustomError = require("../../utils/CustomError");

app.use("/feedback", feedbackRoutes);

describe("Feedback Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all feedback for a specific course", async () => {
    const mockFeedback = [
      { id: 1, comment: "Great!" },
      { id: 2, comment: "Not bad" },
    ];

    feedbackService.getCourseFeedback.mockResolvedValue(mockFeedback);

    const response = await request(app).get("/feedback/course/1").send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFeedback);
  });

  it("should create new feedback", async () => {
    const feedbackData = { comment: "Amazing lecture!" };
    feedbackService.createFeedback.mockResolvedValue(feedbackData);

    const response = await request(app).post("/feedback").send(feedbackData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(feedbackData);
  });

  it("should get feedback from a specific user", async () => {
    const mockFeedback = [
      { id: 1, comment: "Great!" },
      { id: 2, comment: "Not bad" },
    ];
    const userId = 2;

    feedbackService.getUserFeedback.mockResolvedValue(mockFeedback);

    const response = await request(app).get(`/feedback/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockFeedback);
  });

  it("should return 400 for invalid feedback data", async () => {
    const feedbackData = { comment: "" }; // Invalid feedback
    feedbackService.createFeedback.mockImplementation(() => {
      throw new CustomError(400, "Invalid feedback data");
    });

    const response = await request(app).post("/feedback").send(feedbackData);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid feedback data");
  });
});
