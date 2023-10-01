const express = require("express");

const router = express.Router();
const Joi = require("joi");
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const enrollmentService = require("../services/courseEnrollmentService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");
const { getEnrollById } = require("../services/courseEnrollmentService");

const courseCreateSchema = Joi.object({
  courseName: Joi.string().min(4).max(160).required(),
  courseDescription: Joi.string().max(255).optional().allow(""),
  courseLecture: Joi.string().max(255).optional().allow(""),
});

// get all courses
router.get("/", verifyToken, async (req, res) => {
  const courses = await courseService.getAllCourses();

  if (!courses) throw new CustomError(404, "Can't fetch all courses");

  // return all courses
  res.status(200).json({ message: "Courses found successfully", courses });
});

// create a new course
router.post("/", verifyToken, async (req, res) => {
  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  validate(courseCreateSchema, req.body);
  const { courseName, courseDescription } = req.body;
  const teacherId = parseInt(req.user.id, 10);
  const data = {
    name: courseName,
    description: courseDescription,
    lecturerId: teacherId,
  };

  const newCourse = await courseService.createCourse(data);

  const courseId = newCourse.id;

  // Teacher enrolls to course with status approved
  const enrollmentData = {
    userId: teacherId,
    courseId,
  };

  await enrollmentService.createEnrollment(enrollmentData);
  await enrollmentService.updateEnrollment({
    ...enrollmentData,
    status: "APPROVED",
  });
  res.status(200).json(newCourse);
});

// find a course with id
router.get("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Course not found");

  if (req.user.userType === "STUDENT") {
    // if student, delete enrollments before responding
    delete course.enrollments;
  }

  const enrollment = await getEnrollById(req.user.id, id);

  // get course by id and add it to response
  return res
    .status(200)
    .json({ message: "Course found successfully", course, enrollment });
});

// get course participants (tämä palauttaa vain hyväksytyt)
router.get("/:id/participants", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Participants can not be found");

  // get participants by id and add to response
  const participants = await courseService.getParticipants(id);

  if (!participants) throw new CustomError(404, "Participants not found");

  return res
    .status(200)
    .json({ message: "Participants found successfully", participants });
});

// Get feedback for a course
router.get("/:id/feedback", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Feedback can not be found");

  // get course feedback and add to res
  const feedback = await feedbackService.getCourseFeedback(id);
  if (!feedback) throw new CustomError(404, "Feedback not found");

  return res
    .status(200)
    .json({ message: "Feedback found successfully", feedback });
});

// get course lectures
router.get("/:id/lectures", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);

  if (!course) throw new CustomError(404, "Lectures not found");

  // Get lectures and add to response
  const lectures = await courseService.getAllLectures(courseId);
  return res
    .status(200)
    .json({ message: "Lectures found successfully", lectures });
});

// course enrollment (tietyn kurssin ilmoittautuneet riippumatta statuksesta)
router.get("/:id/enrollments", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const enrollments = await courseService.getEnrollments(courseId);

  console.log(enrollments);

  if (!enrollments) throw new CustomError(404, "Enrollments not found");

  // Get enrollments and add to response
  return res.status(200).json({
    message: "Enrollments found successfully",
    enrollments,
  });
});

// delete course
router.delete("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);

  if (!course) throw new CustomError(404, "Course not found");
  if (course.lecturerId !== req.user.id)
    throw new CustomError(403, "Unauthorized");

  await courseService.deleteCourse(courseId);
  return res.status(200).json({ message: "course deleted successfully" });
});

// Edit course
router.put("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);
  const { courseName, courseDescription, courseLecture } = req.body;

  if (!course) throw new CustomError(404, "Course not found");

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  const updatedCourse = await courseService.editCourse(courseId, {
    courseName,
    courseDescription,
    courseLecture,
  });

  return res
    .status(200)
    .json({ message: "Course updated successfully", updatedCourse });
});

module.exports = router;
