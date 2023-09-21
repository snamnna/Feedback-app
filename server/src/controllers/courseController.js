const express = require("express");

const router = express.Router();
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService")
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");

// get all courses
router.get("/", verifyToken, async (req, res) => {
  const courses = await courseService.getAllCourses();
  
  if (!courses) throw new CustomError(404, "Can't fetch all courses")
   
  //return all courses
  res.status(200).json({ message: "Courses found successfully", courses });
});

// create a new course
router.post("/", verifyToken, async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const id = parseInt(req.user.id, 10)
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
    const id = parseInt(req.params.id, 10)
    const course = await courseService.getCourseById(id);

    if (!course) throw new CustomError(404, "Course not found")
  
  //get course by id and add it to response
  return res.status(200).json({ message: "Course found successfully", course });
});

// get course participants (tämä palauttaa kaikki enrollmentit)
router.get("/:id/participants", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const course = await courseService.getCourseById(id);

  // Participants palauttaa enrolled, pitäisi saada vielä palauttamaan oikeasti participants??

  if (!course) throw new CustomError(404, "Participants can not be found")
  
  // get participants by id and add to response
  const participants = await courseService.getAllParticipants(id);
  return res.status(200).json({ message: "Participants found successfully", participants });
});

// Get feedback for a course 
router.get("/:id/feedback", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Feedback can not be found")
  
  // todo: hae kurssin feedback tässä ja liitä tähän responseen se feedback
  
  const feedback = await courseService.getCourseFeedback(id) //
  if (!feedback) throw new CustomError(404, "Feedback not found")

  return res.status(200).json({ message: "Feedback found successfully", feedback});
});

// get course lecturees
router.get("/:id/lectures", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const course = await courseService.getCourseById(id);

  if (!course) throw new CustomError(404, "Lectures not found")
  
  //Get lectures and add to response
  const lectures = await courseService.getAllLectures(id);
  return res.status(200).json({ message: "Lectures found successfully", lectures });
});

// course enrollment (tietyn kurssin ilmoittautuneet)
router.get("/:id/enrollment", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10)
  const enrollments = await courseService.getAllParticipants(courseId)

  //Huom, participants palauttaa enrolled, tämä siis tällä ok?

  if(!enrollments) throw new CustomError(404, "Enrollments not found")

  //Get enrollments and add to response
  return res.status(200).json({ message: "Enrollments found successfully", enrollments})
})

// get the students who have enrolled to spesific course?

module.exports = router;
