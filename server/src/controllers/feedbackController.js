const express = require("express");

const router = express.Router();
const Joi = require("joi");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");

const feedbackCreateSchema = Joi.object({
  feedbackType: Joi.string().valid("BAD", "GREAT", "NEUTRAL").required(),
  comment: Joi.string().max(160).optional().allow(""),
  lectureId: Joi.number().integer().required(),
});

// get all feedback of spesific course
router.get("/:id", verifyToken, async (req, res) => {
  const courseId = parseInt(req.params.id, 10);

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  const feedback = await feedbackService.getCourseFeedback(courseId);
  if (!feedback) throw new CustomError(404, "Feedback not found");
  return res
    .status(200)
    .json({ message: "Feedback found successfully", feedback });
});

// create new feedback
router.post("/", verifyToken, async (req, res) => {
  validate(feedbackCreateSchema, req.body);
  const { feedbackType, comment, lectureId } = req.body;
  const userId = req.user.id;

  const existingFeedback = await feedbackService.getUserLectureFeedback(
    userId,
    lectureId,
  );

  if (existingFeedback)
    throw new CustomError(400, "Can't give more than one feedback");

  const data = {
    feedbackType,
    comment,
    lectureId,
  };

  const validation = feedbackCreateSchema.validate(data);

  if (validation.error) {
    throw new CustomError(400, "Invalid feedback data");
  }

  const newFeedback = await feedbackService.createFeedback(data);
  return res
    .status(200)
    .json({ message: "Feedback created successfully", newFeedback });
});

// feedback from spesific user
router.get("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const feedback = await feedbackService.getUserFeedback(userId);

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  if (!feedback) throw new CustomError(404, "Feedback not found");
  return res
    .status(200)
    .json({ message: "Feedback found successfully", feedback });
});

module.exports = router;
