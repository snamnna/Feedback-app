const { PrismaClient } = require("@prisma/client");
const {
  createLecture,
  updateLecture,
  deleteLecture,
  getAllFeedbacksOfLecture,
  getLectureById,
} = require("../../services/lectureService");

const PrismaClientMocked = new PrismaClient();

jest.mock("@prisma/client");

describe("Lecture Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // createLecture test(s)
  it("should create a lecture", async () => {
    const mockLectureData = {
      courseId: 1,
      lectureName: "New Lecture",
    };

    PrismaClientMocked.lecture.create.mockResolvedValue(mockLectureData);

    const result = await createLecture(mockLectureData);
    expect(PrismaClientMocked.lecture.create).toHaveBeenCalledWith({
      data: {
        name: mockLectureData.lectureName,
        courseId: mockLectureData.courseId,
      },
    });
    expect(result).toEqual(mockLectureData);
  });

  // updateLecture test(s)
  it("should update a lecture", async () => {
    const mockId = 1;
    const mockName = "Updated Lecture";

    PrismaClientMocked.lecture.update.mockResolvedValue({
      id: mockId,
      name: mockName,
    });

    const result = await updateLecture(mockId, mockName);
    expect(PrismaClientMocked.lecture.update).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      data: {
        name: mockName,
      },
    });
    expect(result).toEqual({
      id: mockId,
      name: mockName,
    });
  });

  // deleteLecture test(s)
  it("should delete a lecture by its ID", async () => {
    const mockId = 2;
    const mockLecture = { id: mockId, name: "Lecture to Delete" };

    PrismaClientMocked.lecture.delete.mockResolvedValue(mockLecture);

    const result = await deleteLecture(mockId);

    expect(PrismaClientMocked.lecture.delete).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
    });
    expect(result).toEqual(mockLecture);
  });

  // getAllFeedbacksOfLecture test(s)
  it("should fetch all feedbacks of a specific lecture", async () => {
    const mockId = 1;
    const mockCourseId = 1;
    const mockFeedbacks = [
      { id: 1, content: "Feedback 1" },
      { id: 2, content: "Feedback 2" },
    ];

    PrismaClientMocked.lecture.findMany.mockResolvedValue({
      feedback: mockFeedbacks,
    });

    const result = await getAllFeedbacksOfLecture(mockId, mockCourseId);
    expect(result).toEqual(mockFeedbacks);
    expect(
      PrismaClientMocked.lecture.findMany,
      "Check query arguments",
    ).toHaveBeenCalledWith({
      where: {
        id: mockId,
        courseId: mockCourseId,
      },
      select: {
        feedback: true,
      },
    });
  });

  // getLectureById test(s)
  it("should fetch a lecture by its ID", async () => {
    const mockId = 1;
    const mockLecture = { id: mockId, name: "Test Lecture" };

    PrismaClientMocked.lecture.findUnique.mockResolvedValue(mockLecture);

    const result = await getLectureById(mockId);
    expect(PrismaClientMocked.lecture.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
    });
    expect(result).toEqual(mockLecture);
  });
});
