const express = require("express");

const router = express.Router();
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const Joi = require("joi");
const validate = require("../utils/validate");

const courseCreateSchema = Joi.object({
  courseName: Joi.string().min(4).max(160).required(),
  courseDescription: Joi.string().max(255).optional().allow(""),
});

// get all courses
router.get("/", verifyToken, async (req, res) => {
  const courses = await courseService.getAllCourses();

  if (!courses) throw new CustomError(404, "Can't fetch all courses");

  //return all courses
  res.status(200).json({ message: "Courses found successfully", courses });
});

// create a new course
router.post("/", verifyToken, async (req, res) => {

  if(req.user.userType !== "TEACHER"){
    return res.status(403).json({ message: "Permission denied"})
  }
  
  validate(courseCreateSchema, req.body);
  const { courseName, courseDescription } = req.body;
  const id = parseInt(req.user.id, 10);
  const data = {
    name: courseName,
    description: courseDescription,
    lecturerId: id,
  };

  const newCourse = await courseService.createCourse(data);
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

  //get course by id and add it to response
  return res.status(200).json({ message: "Course found successfully", course });
});

// get course participants (tämä palauttaa vain hyväksytyt)
router.get("/:id/participants", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Participants can not be found");

  // get participants by id and add to response
  const participants = await courseService.getApprovedParticipants(id);
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
  const id = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Lectures not found");

  //Get lectures and add to response
  const lectures = await courseService.getAllLectures(id);
  return res
    .status(200)
    .json({ message: "Lectures found successfully", lectures });
});

// course enrollment (tietyn kurssin ilmoittautuneet riippumatta statuksesta)
router.get("/:id/enrollment", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const participants = await courseService.getAllParticipants(courseId);

  if (!participants) throw new CustomError(404, "Enrollments not found");

  //Get enrollments and add to response
  return res
    .status(200)
    .json({ message: "Enrollments found successfully", participants });
});

//delete course
router.delete("/:id", verifyToken, async (req,res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = await courseService.getCourseById(courseId);

  if(!course) throw new CustomError(404, "Course not found");
  if(course.lecturerId !== req.user.id) throw new CustomError(403, "Unauthorized");

  await courseService.deleteCourse(courseId);
  return res.status(200).json({message: "course deleted successfully"})
});



module.exports = router;
