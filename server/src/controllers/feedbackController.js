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

// create new feedback

// feedback from spesific user

module.exports = router;
