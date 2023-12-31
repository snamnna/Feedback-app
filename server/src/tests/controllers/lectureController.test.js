const request = require("supertest");
const express = require("express");
require("express-async-errors");

const app = express();
const router = require("../../controllers/lectureController");

app.use(express.json());
app.use("/lectures", router);

// Mocking the dependencies
jest.mock("../../services/lectureService");
jest.mock("../../middlewares/verifyToken");
const lectureService = require("../../services/lectureService");
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

const mockLecture ={
  id: 1,
  name: "Lecture 1",
  course: "Course 1",
  courseId: 1,
  feedback: [
    {
      id: 1,
      feedbackType: "GREAT",
      comment: "Great lecture!",
      userId: 1,
      lectureId: 1,
      createdAt: "2023-11-25T08:30:00.123Z"
    },
    {
      id: 2,
      feedbackType: "BAD",
      comment: "Would love more examples.",
      userId: 2,
      lectureId: 1,
      createdAt: "2023-11-25T08:30:00.123Z"
    }
  ],
  createdAt: "2023-11-25T08:30:00.123Z"
}  

const mockLectureWithoutFeedback ={
  id: 2,
  name: "Lecture 2",
  course: "Course 1",
  courseId: 1,
  feedback: [],
  createdAt: "2023-11-25T08:30:00.123Z"
} 

describe("POST /api/lectures", () => {
  describe("given the user is lecturer", () => {
    it("can create a new lecture", async () => {
      lectureService.createLecture.mockResolvedValue(mockLecture);
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 1, userType: "TEACHER" };
        next();
      });

      const { statusCode, body } = await request(app).post("/lectures").send({
        lectureName: "Lecture 1",
        courseId: "1",
      });

      expect(statusCode).toBe(200);
      expect(body).toEqual(mockLecture);
    });
  });

  describe("given user is student", () => {
    it("should return 403", async () => {
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 1, userType: "STUDENT" };
        next();
      });

      const { statusCode } = await request(app).post("/lectures").send({
        lectureName: "Lecture 1",
        courseId: "1",
      });

      expect(statusCode).toBe(403);
      expect(app).toThrow();
    });
  });
});

describe("GET /api/lectures/:id", () => {
  it("should return 200 and the lecture", async () => {
    lectureService.getLectureById.mockResolvedValue(mockLecture);

    verifyToken.mockImplementation((req, res, next) => {
      req.user = { id: 6, userType: "TEACHER" };
      next();
    });

    const { statusCode, body } = await request(app).get(
      `/lectures/${mockLecture.id}`,
    );

    expect(statusCode).toBe(200);
    expect(body).toEqual({
      message: "Lecture found successfully",
      lecture: mockLecture,
    });
  });

  // Feedbackin tarkastelu

  describe("given user is lecturer", () => {
    it("should include feedback", async () => {
      lectureService.getLectureById.mockResolvedValue(mockLecture);
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 6, userType: "TEACHER" };
        next();
      });

      const { body, statusCode } = await request(app).get(
        `/lectures/${mockLecture.id}`,
      );
      expect(statusCode).toBe(200);
      expect(body.lecture).toHaveProperty("feedback");
    });
  })
  describe("given user is student", () => {
    it("should return 403", async () => {
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 1, userType: "STUDENT" };
        next();
      });

      const { statusCode } = await request(app).post("/lectures").send({
        lectureName: "Lecture 1",
        courseId: "1",
      });

      expect(statusCode).toBe(403);
      expect(app).toThrow();
    });
  });
});

// Poistaminen

describe("DELETE /api/lectures/:id", () => {
  describe("given the user is lecturer", () => {
    it("should delete lecture and return 200", async () => {
      const lectureId = 2;

      lectureService.getLectureById.mockResolvedValue(mockLectureWithoutFeedback);
      lectureService.deleteLecture.mockResolvedValue(undefined);

      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 6, userType: "TEACHER"};
        next();
      });

      const res = await request(app).delete(`/lectures/${lectureId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toEqual({ message: "Lecture deleted successfully" });
      expect(lectureService.deleteLecture).toHaveBeenCalledExactlyOnceWith(lectureId);
    });
  });
  describe("given user is student", () => {
    it("should return 403", async () => {
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 1, userType: "STUDENT" };
        next();
      });

      const { statusCode } = await request(app).post("/lectures").send({
        lectureName: "Lecture 1",
        courseId: "1",
      });

      expect(statusCode).toBe(403);
      expect(app).toThrow();
    });
  });

  describe("given the user is lecturer", () => {
    it("lecture can not be deleted if it doesn't exist", async () => {
      const lectureId = 5;

      lectureService.getLectureById.mockResolvedValue(null);
      lectureService.deleteLecture.mockResolvedValue(null);

      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 6, userType: "TEACHER" };
        next();
      });

      const res = await request(app).delete(`/lectures/${lectureId}`);

      expect(res.statusCode).toBe(404);
    });
  });
});

// Muokkaaminen

describe("PUT /api/lectures/:id", () => {
  describe("given the user is lecturer", () => {
    it("should update lecture", async () => {const updatedLecture = { id: 1, name: "Updated Lecture" };
      lectureService.getLectureById.mockResolvedValue(mockLecture);
      lectureService.updateLecture.mockResolvedValue(updatedLecture);

      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 6, userType: "TEACHER" };
        next();
      });

      const { statusCode, body } = await request(app)
        .put(`/lectures/${mockLecture.id}`)
        .send({ lectureName: updatedLecture.name });

      expect(statusCode).toBe(200);
      expect(body).toEqual({
        message: "Lecture updated successfully",
        updatedLecture,
      });
    });
  });
  describe("given user is student", () => {
    it("should return 403", async () => {
      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 1, userType: "STUDENT" };
        next();
      });

      const { statusCode } = await request(app).post("/lectures").send({
        lectureName: "Lecture 1",
        courseId: "1",
      });

      expect(statusCode).toBe(403);
      expect(app).toThrow();
    });
  });

  describe("given the user is lecturer", () => {
    it("lecture can not be updated if it doesn't exist", async () => {
      const updatedLecture = { id: 1, name: "Updated Lecture" };
      lectureService.updateLecture.mockResolvedValue(updatedLecture);

      verifyToken.mockImplementation((req, res, next) => {
        req.user = { id: 6, userType: "TEACHER" };
        next();
      });

      const nonExistingLectureId = 999; 
      lectureService.getLectureById.mockResolvedValue(null);

      const { statusCode, body } = await request(app)
        .put(`/lectures/${nonExistingLectureId}`)
        .send({ lectureName: updatedLecture.name });

      expect(statusCode).toBe(404);
    });
  });
  
});
