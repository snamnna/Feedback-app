const { PrismaClient } = require("@prisma/client");

const PrismaClientMocked = PrismaClient();
const {
  getCourseFeedback,
  createFeedback,
  getUserFeedback,
} = require("../../services/feedbackService"); // replace with your actual module path

jest.mock("@prisma/client");

describe("Feedback Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create feedback", async () => {
    const mockFeedbackData = {
      userId: 1,
      lectureId: 1,
      feedbackType: "GREAT",
      comment: "Awesome lecture!",
    };

    PrismaClientMocked.feedback.create.mockResolvedValue(mockFeedbackData);

    const result = await createFeedback(mockFeedbackData);
    expect(PrismaClientMocked.feedback.create).toHaveBeenCalledWith({
      data: mockFeedbackData,
    });
    expect(result).toEqual(mockFeedbackData);
  });

  it("should fetch ALL feedbacks of a specific course", async () => {
    const mockId = 1;
    const mockFeedback = [
      {
        id: 1,
        feedbackType: "GREAT",
        comment: "awesome course",
        lectureId: 1,
        userId: 1,
      },
    ];

    const mockCourse = {
      id: mockId,
      name: "Test Course",
      lecturerId: 5,
      lectures: [
        { id: 1, name: "Test Lecture", feedback: [mockFeedback] },
        { id: 1, name: "Test Lecture", feedback: [mockFeedback] },
      ],
    };

    PrismaClientMocked.course.findUnique.mockResolvedValue(mockCourse);

    const result = await getCourseFeedback(mockId);

    expect(PrismaClientMocked.course.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      select: {
        lectures: {
          select: {
            feedback: true,
          },
        },
      },
    });
  });

  it("should fetch ALL feedbacks given by a specific user", async () => {
    const mockUserId = 1;
    const mockUserFeedback = [
      {
        id: 1,
        feedbackType: "GREAT",
        comment: "Awesome course!",
        userId: mockUserId,
        lectureId: 1,
        createdAt: "2021-04-20T12:00:00.000Z",
      },
      {
        id: 2,
        feedbackType: "BAD",
        comment: "Bad course!",
        userId: mockUserId,
        lectureId: 2,
        createdAt: "2021-04-20T12:00:00.000Z",
      },
    ];

    PrismaClientMocked.feedback.findMany.mockResolvedValue(mockUserFeedback);

    const result = await getUserFeedback(mockUserId);
    expect(
      PrismaClientMocked.feedback.findMany,
      "Make sure to use correct model and find method! (findMany/findUnique)",
    ).toHaveBeenCalled();
    expect(PrismaClientMocked.feedback.findMany).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
      },
    });
    expect(result).toEqual(mockUserFeedback);
  });
});
