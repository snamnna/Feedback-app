const {
  createEnrollment,
  deleteEnrollment,
  getCourseEnrollmentsByCourseId,
  getUserEnrollmentsByUserId,
} = require("../../services/courseEnrollmentService");

jest.mock("@prisma/client");

const { PrismaClient } = require("@prisma/client");

const PrismaClientMocked = PrismaClient();

describe("Course Enrollment Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new enrollment", async () => {
    const mockEnrollmentData = { userId: 1, courseId: 1, status: "PENDING" };
    PrismaClientMocked.courseEnrollment.create.mockReturnValue(
      mockEnrollmentData,
    );

    const result = await createEnrollment(
      mockEnrollmentData.userId,
      mockEnrollmentData.courseId,
    );

    expect(result).toEqual(mockEnrollmentData);
    expect(PrismaClientMocked.courseEnrollment.create).toHaveBeenCalledWith({
      data: {
        userId: mockEnrollmentData.userId,
        courseId: mockEnrollmentData.courseId,
      },
    });
  });

  it("should delete an enrollment", async () => {
    const mockEnrollmentData = { userId: 1, courseId: 1 };
    PrismaClientMocked.courseEnrollment.delete.mockReturnValue(
      mockEnrollmentData,
    );

    const result = await deleteEnrollment(
      mockEnrollmentData.userId,
      mockEnrollmentData.courseId,
    );

    expect(result).toEqual(mockEnrollmentData);
    expect(PrismaClientMocked.courseEnrollment.delete).toHaveBeenCalledWith({
      where: {
        userId: mockEnrollmentData.userId,
        courseId: mockEnrollmentData.courseId,
      },
    });
  });

  it("should get all enrollments for a course", async () => {
    const mockEnrollments = [
      { userId: 1, courseId: 1 },
      { userId: 3, courseId: 1 },
      { userId: 2, courseId: 1 },
      { userId: 2, courseId: 2 },
    ];
    PrismaClientMocked.courseEnrollment.findMany.mockImplementation((args) =>
      mockEnrollments.filter((enrollment) => {
        if (enrollment.courseId === args.where.courseId) {
          return enrollment;
        }
      }),
    );

    const result = await getCourseEnrollmentsByCourseId(1);
    expect(result).toEqual([
      { userId: 1, courseId: 1 },
      { userId: 3, courseId: 1 },
      { userId: 2, courseId: 1 },
    ]);
  });

  it("should get all courses enrolled by a user", async () => {
    const mockEnrollments = [
      { userId: 1, courseId: 1 },
      { userId: 1, courseId: 2 },
      { userId: 2, courseId: 2 },
      { userId: 2, courseId: 1 },
    ];

    PrismaClientMocked.courseEnrollment.findMany.mockImplementation((where) =>
      mockEnrollments.filter((enrollment) => {
        if (enrollment.userId === where.where.userId) {
          console.log(enrollment);
          return enrollment;
        }
      }),
    );

    const result = await getUserEnrollmentsByUserId(1);

    expect(result).toEqual([
      { userId: 1, courseId: 1 },
      { userId: 1, courseId: 2 },
    ]);
    expect(PrismaClientMocked.courseEnrollment.findMany).toHaveBeenCalledWith({
      where: {
        userId: 1,
      },
    });
  });
});
