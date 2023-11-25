const request = require("supertest");
const express = require("express");
require("express-async-errors");

const app = express();
const router = require("../../controllers/courseController");

app.use(express.json());
app.use("/courses", router);

// Mocking the dependencies
jest.mock("../../services/courseService");
jest.mock("../../middlewares/verifyToken");
const courseService = require("../../services/courseService");
const verifyToken = require("../../middlewares/verifyToken");

jest.setTimeout(10000);

const mockCourse = {
  id: 1,
  name: "Course 1",
  description: "Description 1",
  lecturerId: 5,
  enrollments: [
    { id: 1, userId: 1, courseId: 1, status: "APPROVED" },
    { id: 2, userId: 2, courseId: 1, status: "APPROVED" },
    { id: 1, userId: 3, courseId: 1, status: "REJECTED" },
    { id: 1, userId: 4, courseId: 1, status: "REJECTED" },
  ],
  lectures: [
    { id: 1, name: "Lecture 1" },
    { id: 2, name: "Lecture 2" },
  ],
};

const mockParticipants = [
  { id: 1, username: "test", userType: "STUDENT" },
  { id: 2, username: "test2", userType: "STUDENT" },
];

describe("Courses API", () => {
  describe("GET /api/courses", () => {
    it("should return 200 and all courses", async () => {
      const mockCourses = [
        {
          id: 1,
          name: "Course 1",
          description: "Description 1",
          lecturerId: 5,
        },
        {
          id: 2,
          name: "Course 2",
          description: "Description 2",
          lecturerId: 5,
        },
      ];
      courseService.getAllCourses.mockReturnValue(Promise.resolve(mockCourses));
      verifyToken.mockImplementation((req, res, next) => next());

      const { body, statusCode } = await request(app).get("/courses");
      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Courses found successfully",
        courses: mockCourses,
      });
    });
  });

  describe("GET /api/courses/:id", () => {
    describe("given a course exists", () => {
      it("should return 200 and the course", async () => {
        courseService.getCourseById.mockResolvedValue(mockCourse);

        verifyToken.mockImplementation((req, res, next) => {
          req.user = { id: 1, username: "test" };
          next();
        });

        const { statusCode, body } = await request(app).get(
          `/courses/${mockCourse.id}`,
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          message: "Course found successfully",
          course: mockCourse,
        });
      });

      describe("given the user is lecturer/teacher", () => {
        it("should include enrollments", async () => {
          courseService.getCourseById.mockResolvedValue(mockCourse);
          verifyToken.mockImplementation((req, res, next) => {
            req.user = { id: 5, userType: "TEACHER" };
            next();
          });

          const { body, statusCode } = await request(app).get(
            `/courses/${mockCourse.id}`,
          );
          expect(statusCode).toBe(200);
          expect(body.course).toHaveProperty("enrollments");
        });
        it("should include lectures", async () => {
          // Assuming the course has some lectures
          courseService.getCourseById.mockResolvedValue(mockCourse);
          verifyToken.mockImplementation((req, res, next) => {
            req.user = { id: 5, userType: "TEACHER" };
            next();
          });

          const { body, statusCode } = await request(app).get(
            `/courses/${mockCourse.id}`,
          );
          expect(statusCode).toBe(200);
          expect(body.course).toHaveProperty("lectures");
        });
      });

      describe("given the user is student", () => {
        it("should include lectures if user is enrolled and approved", async () => {
          courseService.getCourseById.mockResolvedValue(mockCourse);
          verifyToken.mockImplementation((req, res, next) => {
            req.user = { id: 1, userType: "STUDENT" };
            next();
          });

          const { body, statusCode } = await request(app).get(
            `/courses/${mockCourse.id}`,
          );
          expect(statusCode).toBe(200);
          expect(body.course).toHaveProperty("lectures");
        });

        it("should not include enrollments", async () => {
          courseService.getCourseById.mockResolvedValue(mockCourse);
          verifyToken.mockImplementation((req, res, next) => {
            req.user = { id: 1, userType: "STUDENT" };
            next();
          });

          const { body, statusCode } = await request(app).get(
            `/courses/${mockCourse.id}`,
          );
          expect(statusCode).toBe(200);
          expect(body.course).not.toHaveProperty("enrollments");
        });
      });
    });

    describe("/participants", () => {
      beforeAll(() => {
        courseService.getCourseById = jest.fn();
        courseService.getParticipants = jest.fn();
      });
      it("should return a message and an array of participants", async () => {
        courseService.getCourseById.mockResolvedValue(mockCourse);
        courseService.getParticipants.mockResolvedValue(mockParticipants);
        verifyToken.mockImplementation((req, res, next) => {
          req.user = { id: 5, userType: "TEACHER" };
          next();
        });

        const { statusCode, body } = await request(app).get("/courses/1");

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          message: "Participants found successfully",
          participants: expect.arrayContaining(mockParticipants),
        });
      });
    });
  });

  describe("given a course doesnt exist", () => {
    it("should return 404 if course is not found", async () => {
      courseService.getCourseById.mockResolvedValue(null);
      verifyToken.mockImplementation((req, res, next) => next());

      const { statusCode } = await request(app).get("/courses/1");
      expect(statusCode).toBe(404);
      expect(app).toThrow();
    });
  });
  describe("POST /api/courses", () => {
    describe("given the user is lecturer", () => {
      it("can create a new course", async () => {
        courseService.createCourse.mockResolvedValue(mockCourse);
        verifyToken.mockImplementation((req, res, next) => {
          req.user = { id: 5, username: "lecturer", userType: "TEACHER" };
          next();
        });

        const { statusCode, body } = await request(app).post("/courses").send({
          courseName: "Course 1",
          courseDescription: "Description 1",
        });

        expect(statusCode).toBe(200);
        expect(body).toEqual(mockCourse);
      });
    });

    describe("given the user is student", () => {
      it("should return 403", async () => {
        verifyToken.mockImplementation((req, res, next) => {
          req.user = { id: 5, username: "student", userType: "STUDENT" };
          next();
        });

        const { statusCode } = await request(app).post("/courses").send({
          courseName: "Course 1",
          courseDescription: "Description 1",
        });

        expect(statusCode).toBe(403);
        expect(app).toThrow();
      });
    });
  });
});
