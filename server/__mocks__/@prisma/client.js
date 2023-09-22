const mockUser = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockCourse = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockCourseEnrollment = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockLecture = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockFeedback = {
  findUnique: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const PrismaClientMocked = {
  user: mockUser,
  course: mockCourse,
  courseEnrollment: mockCourseEnrollment,
  lecture: mockLecture,
  feedback: mockFeedback,
};

module.exports = {
  PrismaClient: jest.fn(() => PrismaClientMocked),
  UserType: {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER",
    ADMIN: "ADMIN",
  },
  FeedbackType: {
    BAD: "BAD",
    NEUTRAL: "NEUTRAL",
    GREAT: "GREAT",
  },
  EnrollmentStatus: {
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    APPROVED: "APPROVED",
  },
};
