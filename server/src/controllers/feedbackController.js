const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
const feedbackService = require("../services/feedbackService")
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const Joi = require("joi");

const feedbackCreateSchema = Joi.object({
  feedbackType: Joi.string().valid("BAD", "GREAT", "NEUTRAL").required(),
  comment: Joi.string().max(160).optional().allow(""),
  userId: Joi.number().integer().required(),
  lectureId: Joi.number().integer().required(),
});

// get all feedback of spesific course
router.get("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10)
  const feedback = await feedbackService.getCourseFeedback(courseId)
  if(!feedback) throw new CustomError(404, "Feedback not found")
  return res.status(200).json({ message: "Feedback found successfully", feedback });
});

// create new feedback KESKEN
//Tähän pyydetty apua koska en osaa
router.post("/", verifyToken, async (req, res) => {
  const { courseId, feedback} = req.body
})



// create a new course POISTA
router.post("/", verifyToken, async (req, res) => {
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

// feedback from spesific user
router.get("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const feedback = await feedbackService.getUserFeedback(userId)
  if(!feedback) throw new CustomError(404, "Feedback not found")
  return res.status(200).json({ message: "Feedback found successfully", feedback });
})

module.exports = router;
