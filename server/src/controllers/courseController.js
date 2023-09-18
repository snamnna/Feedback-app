const express = require("express");

const router = express.Router();
const courseService = require("../services/courseService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");

// todo: try-catch pois ja käytä custom erroria ja error handleria,
//  servicen voi laittaa heittää sen custom errorin jos joku menee pieleen eikä tarvi catchata et se menee error handleriin
// todo: custom errorin saa heitettyä esim. throw new CustomError(404, "User not found");
// get all courses
router.get("/", verifyToken, async (req, res) => {
  const courses = await courseService.getAllCourses();
  
  if (!courses) 
    throw new CustomError(404, "Can't fetch all courses")
    
  // TODO: palauta kaikki kurssit tietokannasta tässä
  res.status(200).json({ message: "Courses found successfully" });
  res.json(courses);
});

// create a new course
router.post("/", verifyToken, async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const { id } = req.user;
  const data = {
    name: courseName,
    description: courseDescription,
    lecturerId: id,
  };

  const newCourse = await courseService.createCourse(data);
  res.status(200).json(newCourse);
});

// todo: try-catch pois ja käytä custom erroria ja error handleria
// find a course with id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "course found successfully", course });
  } catch (error) {
    console.log("Getting a specific courses failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // TODO: hae kurssi id:n perusteella tässä ja liitä tähän responseen se kurssi
  return res.status(200).json({ message: "course found successfully" });
});

// todo: try-catch pois ja käytä custom erroria ja error handleria
router.get("/:id/participants", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const participants = await courseService.getAllParticipants(id);
    res
      .status(200)
      .json({ message: "participants found successfully", participants });
  } catch (error) {
    console.log("Getting participants failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // TODO: hae kurssin osallistujat tässä ja liitä tähän responseen ne osallistujat
  return res.status(200).json({ message: "participants found successfully" });
});

// todo: try-catch pois ja käytä custom erroria ja error handleria
// Get feedback for a course
router.get("/:id/feedback", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.log("Getting feedback failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // todo: hae kurssin feedback tässä ja liitä tähän responseen se feedback
  return res.status(200).json({ message: "feedback found successfully" });
});

router.get("/:id/lectures", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const lectures = await courseService.getAllLectures(id);
    res.status(200).json({ message: "Lectures found successfully", lectures });
  } catch (error) {
    console.log("Getting lectures failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // todo: hae kurssin luennot tässä ja liitä tähän responseen ne luennot
  return res.status(200).json({ message: "lectures found successfully" });
});

module.exports = router;
