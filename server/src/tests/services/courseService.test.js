const { PrismaClient } = require("@prisma/client");
const {
  getCourseById,
  getCourseByName,
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllParticipants,
  getAllLectures,
} = require("../../services/courseService"); // replace with your actual module path

const PrismaClientMocked = PrismaClient();

jest.mock("@prisma/client");

describe("Course Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // getCourseById test(s)
  it("should fetch a course by its ID", async () => {
    const mockId = 1;
    const mockCourse = {
      id: mockId,
      name: "Test Course",
      description: "Test Description",
      lectures: [],
      enrollments: [],
    };

    PrismaClientMocked.course.findUnique.mockResolvedValue(mockCourse);

    const result = await getCourseById(mockId);
    expect(PrismaClientMocked.course.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      include: {
        lectures: true,
        enrollments: true,
      },
    });
    expect(result).toEqual(mockCourse);
  });

  // getCourseByName test(s)
  it("should return an array of courses that match the name", async () => {
    const mockName = "Test Course";
    const mockCourse = { name: mockName };
    const mockCourses = [
      { id: 1, name: mockName },
      { id: 2, name: mockName },
    ];

    PrismaClientMocked.course.findUnique.mockResolvedValue(mockCourse);
    PrismaClientMocked.course.findMany.mockResolvedValue(mockCourses);

    const result = await getCourseByName(mockName);
    expect(
      PrismaClientMocked.course.findUnique,
      "Course names are not unique. Change the findUnique to findMany",
    ).not.toHaveBeenCalled();

    expect(PrismaClientMocked.course.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: mockName,
        },
      },
    });

    expect(result).toEqual(mockCourses);
  });

  // createCourse test(s)
  it("should create a course", async () => {
    const mockCourseData = {
      name: "New Course",
      description: "New Description",
      lecturerId: 1,
      feedback: [],
      lectures: [],
    };

    PrismaClientMocked.course.create.mockResolvedValue(mockCourseData);

    const result = await createCourse({
      name: mockCourseData.name,
      description: mockCourseData.description,
      lecturerId: mockCourseData.lecturerId,
    });

    expect(PrismaClientMocked.course.create).toHaveBeenCalledWith({
      data: {
        name: mockCourseData.name,
        description: mockCourseData.description,
        lecturerId: mockCourseData.lecturerId,
      },
    });
    expect(result).toEqual(mockCourseData);
  });

  it("should delete a course by its ID", async () => {
    const mockId = 2;
    const mockCourse = { id: mockId, name: "Course to Delete" };

    PrismaClientMocked.course.delete.mockResolvedValue(mockCourse);

    const result = await deleteCourse(mockId);

    expect(PrismaClientMocked.course.delete).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
    });
    expect(result).toEqual(mockCourse);
  });

  // editCourse test(s)
  it("should edit a course", async () => {
    const mockId = 3;
    const mockName = "Edited Course";
    const mockDescription = "Edited Description";
    const mockLectures = [];
    const mockEnrollments = [];
    const mockLecturerId = 1;
    const mockLecturer = { id: mockLecturerId, username: "Lecturer" };

    const mockUpdatedCourse = {
      name: mockName,
      description: mockDescription,
      lectures: mockLectures,
      enrollments: mockEnrollments,
      lecturer: mockLecturer,
      lecturerId: mockLecturerId,
    };

    PrismaClientMocked.course.update.mockResolvedValue({
      id: mockId,
      ...mockUpdatedCourse,
    });

    const result = await editCourse(mockUpdatedCourse);
    expect(PrismaClientMocked.course.update).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      data: {
        ...mockUpdatedCourse,
      },
    });
    expect(result).toEqual(mockUpdatedCourse);
  });

  // getAllCourses test(s)
  it("should fetch all courses", async () => {
    const mockCourses = [
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
    ];

    PrismaClientMocked.course.findMany.mockResolvedValue(mockCourses);

    const result = await getAllCourses();
    expect(
      PrismaClientMocked.course.findMany,
      "getAllCourses should call PrismaClient.course.findMany",
    ).toHaveBeenCalled();
    expect(result).toEqual(mockCourses);
  });

  // getAllParticipants test(s)
  it("should fetch all participants of a specific course", async () => {
    const mockId = 1;
    const mockParticipants = [
      { id: 1, username: "test" },
      { userId: 2, username: "test2" },
    ];

    PrismaClientMocked.course.findUnique.mockResolvedValue(mockParticipants);

    const result = await getAllParticipants(mockId);
    expect(result).toEqual(mockParticipants);
    expect(result).toBeArrayOfSize(2);
    expect(
      PrismaClientMocked.course.findUnique,
      "Check query arguments: SELECT ONLY the enrollments. Remember also to only select the user field of those enrollments and check that the enrollment has status APPROVED",
    ).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      select: {
        enrollments: {
          where: {
            status: "APPROVED",
          },
          select: {
            user: true,
          },
        },
      },
    });
  });

  // getAllLectures test(s)
  it("should fetch all lectures of a specific course", async () => {
    const mockId = 1;
    const mockLectures = [
      { id: 1, courseId: mockId, name: "Lecture 1" },
      { id: 2, courseId: mockId, name: "Lecture 2" },
    ];

    PrismaClientMocked.course.findUnique.mockResolvedValue(mockLectures);

    const result = await getAllLectures(mockId);
    expect(
      PrismaClientMocked.course.findUnique,
      "Check query arguments",
    ).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
      select: {
        lectures: true,
      },
    });
    expect(result, "Check that you are returning the lectures array").toEqual(
      mockLectures,
    );
    expect(result).toBeArrayOfSize(2);
  });
});
