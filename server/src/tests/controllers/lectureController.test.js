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
const courseService = require("../../services/courseService");

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

const mockLecture = {
    id: 1,
    name: "Lecture 1",
    courseId: "1"
}

describe("Courses API", () => {
    beforeEach(() => {
        courseService.getAllCourses.mockReset();
        courseService.getCourseById.mockReset();
        courseService.getAllParticipants.mockReset();
        courseService.getAllLectures.mockReset();
        courseService.createCourse.mockReset();
        courseService.editCourse.mockReset();
        courseService.deleteCourse.mockReset();
        verifyToken.mockReset();
    });

    describe("GET /api/lectures", () => {
        it("should return 200 and the lecture", async () => {
            lectureService.getLectureById.mockResolvedValue(mockLecture)

            verifyToken.mockImplementation((req, res, next) => {
                req.user = { id: 1, username: "test" };
                next();
            });

            const { statusCode, body } = await request(app).get(
                `/lectures/${mockCourse.id}`,
            );

            expect(statusCode).toBe(200);
            expect(body).toEqual({
                message: "Lecture found successfully",
                course: mockLecture,
            });
        });  
    })
});    