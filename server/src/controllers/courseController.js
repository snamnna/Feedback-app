const express = require("express");

const router = express.Router();
const courseService = require("../services/courseService");
const verifyToken = require("../middlewares/verifyToken");

// todo: try-catch pois ja käytä custom erroria ja error handleria
// todo: lopussa tulis aina olla se onnistunu response ja nakellaan erroria aiemmin jos joku mättää
// get all courses
router.get("/", verifyToken, async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.log("Getting all courses failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // TODO: palauta kaikki kurssit tietokannasta tässä
  res.status(200).json({ message: "courses found successfully" });
});

// todo: try-catch pois ja käytä custom erroria ja error handleria
// create a new course
router.post("/", verifyToken, async (req, res) => {
  try {
    // TODO: hae käyttäjän tiedot
    // todo: käyttäjän tiedot ja tyyppi löytyy nyt req.user:sta

    const data = req.body;
    const newCourse = await courseService.createCourse(data);
  } catch (error) {
    console.log("creating a new course failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // TODO: kurssin luominen tietokantaan tässä ja liitä responseen se luotu kurssi
  res.status(200).json({ message: "course created successfully" });
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
