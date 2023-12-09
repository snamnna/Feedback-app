/**
 * @module courseController
 * @description Express router for handling course-related endpoints.
 */

const express = require("express");
const Joi = require("joi");
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const enrollmentService = require("../services/courseEnrollmentService");
const { getEnrollById } = require("../services/courseEnrollmentService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");

const router = express.Router();

const courseCreateSchema = Joi.object({
  courseName: Joi.string().min(4).max(160).required(),
  courseDescription: Joi.string().max(255).optional().allow(""),
  courseLecture: Joi.string().max(255).optional().allow(""),
});

/**
 * @name GET /courses
 * @description Fetches all courses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If courses cannot be fetched.
 * @returns {Object} An object with a success message and an array of courses.
 * @returns {string} message - A success message.
 * @returns {Array} courses - An array containing all existing courses.
 */
router.get("/", verifyToken, async (req, res) => {
  const courses = await courseService.getAllCourses();

  if (!courses) throw new CustomError(404, "Can't fetch all courses");

  // Return all courses
  res.status(200).json({ message: "Courses found successfully", courses });
});

/**
 * @name POST /courses
 * @description Creates a new course. The endpoint is only accessible to users with a user type 'TEACHER'.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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

/**
 * @name GET /courses/:id
 * @description Fetches a course by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If courses are not found.
 * @returns {Object} The course that was found with the specified ID.
 */
router.get("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Course not found");

  if (req.user.userType === "STUDENT") {
    // If student, delete enrollments before responding
    delete course.enrollments;
  }

  const enrollment = await getEnrollById(req.user.id, id);

  // Get course by id and add it to response
  return res
    .status(200)
    .json({ message: "Course found successfully", course, enrollment });
});

/**
 * @name GET /courses/:id/participants
 * @description Fetches approved participants of a course.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If course or participants are not found.
 * @returns {Object} All approved participants of a course.
 */
router.get("/:id/participants", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Participants can not be found");

  // Get participants by id and add to response
  const participants = await courseService.getParticipants(id);

  const returnParticipants = participants.enrollments;

  if (!participants) throw new CustomError(404, "Participants not found");

  console.log("returnParticipants", returnParticipants);

  return res.status(200).json({
    message: "Participants found successfully",
    participants: [...returnParticipants],
  });
});

/**
 * @name GET /courses/:id/feedback
 * @description Fetches feedback for a course.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If course or course feedback are not found.
 * @returns {Object} Course feedback for a specified course.
 */
router.get("/:id/feedback", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Feedback can not be found");

  // Get course feedback and add to res
  const feedback = await feedbackService.getCourseFeedback(id);
  if (!feedback) throw new CustomError(404, "Feedback not found");

  return res
    .status(200)
    .json({ message: "Feedback found successfully", feedback });
});

/**
 * @name GET /courses/:id/lectures
 * @description Fetches lectures for a course.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If no lectures are found.
 * @returns {Object} All existing lectures for a course.
 */
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

/**
 * @name GET /courses/:id/enrollments
 * @description Fetches enrollments for a specific course, regardless of enrollment status.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If there are no enrollments.
 * @returns {Object} All enrollments for a course.
 */
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

/**
 * @name DELETE /courses/:id
 * @description Deletes a course.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If course is not found or user is not authorized to delete course.
 */
router.delete("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);

  if (!course) throw new CustomError(404, "Course not found");
  if (course.lecturerId !== req.user.id)
    throw new CustomError(403, "Unauthorized");

  await courseService.deleteCourse(courseId);
  return res.status(200).json({ message: "course deleted successfully" });
});

/**
 * @name PUT /courses/:id
 * @description Edits a course.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {CustomError} If course is not found or user type is not 'TEACHER'.
 */
router.put("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);
  const { courseName, courseDescription } = req.body;

  if (!course) throw new CustomError(404, "Course not found");

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  const updatedCourse = await courseService.editCourse(
    courseId,
    courseName,
    courseDescription,
  );

  return res
    .status(200)
    .json({ message: "Course updated successfully", updatedCourse });
});

module.exports = router;
