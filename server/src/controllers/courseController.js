const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService')


//get all courses
router.get("/", checkToken, async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.json(courses);
    } catch (error) {
        console.log("Getting all courses failed", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//create a new course
router.post("/", checkToken,  async (req, res) => {
   try {
       //TODO: hae käyttäjän tiedot, en tiiä viel onks ne nyt sit headeris vai mitä

       const data = req.body;
       const newCourse = await courseService.createCourse(data)
   }catch (error){
       console.log("creating a new course failed", error);
       res.status(500).json({ error: "Internal Server Error" });
   }
});

//find a course with id
router.get("/:id", checkToken, async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseById(id)

        if(!course){
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json({message: "course found successfully", course});

    }catch (error){
        console.log("Getting a specific courses failed", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id/participants", checkToken, async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseById(id)

        if(!course){
            return res.status(404).json({ error: "Course not found" });

        }
        const participants = await courseService.getAllParticipants(id);
        res.status(200).json({message: "participants found successfully", participants});

    }catch (error){
        console.log("Getting participants failed", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get feedback for a course
router.get("/:id/feedback", checkToken,  async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseById(id)
        if (!course) {
            return res.status(404).json({error: "Course not found"});
        }

    }catch (error){
        console.log("Getting feedback failed", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id/lectures", checkToken,  async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseById(id)
        if (!course) {
            return res.status(404).json({error: "Course not found"});
        }

        const lectures = await courseService.getAllLectures(id);
        res.status(200).json({message: "Lectures found successfully", lectures});
    }catch (error){
        console.log("Getting lectures failed", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
