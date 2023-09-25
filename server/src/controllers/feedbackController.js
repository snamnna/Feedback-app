const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
const feedbackService = require("../services/feedbackService")
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const Joi = require("joi");
const validate = require("../utils/validate");

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

// create new feedback
router.post("/", verifyToken, async (req, res) => {
  validate(feedbackCreateSchema, req.body)
  const { feedbackType, comment, userId, lectureId} = req.body
  //const id = parseInt(req.user.id, 10)

  const data = {
    feedbackType: feedbackType,
    comment: comment,
    userId: userId,
    lectureId: lectureId
  }

  const validation = feedbackCreateSchema.validate(data);

  if (validation.error) {
    throw new CustomError(400, "Invalid feedback data");
  }
  
    const newFeedback = await feedbackService.createFeedback(data)
    res.status(200).json(newFeedback)
  
})

// feedback from spesific user
router.get("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const feedback = await feedbackService.getUserFeedback(userId)
  if(!feedback) throw new CustomError(404, "Feedback not found")
  return res.status(200).json({ message: "Feedback found successfully", feedback });
})

module.exports = router;
