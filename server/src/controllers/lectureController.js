const express = require("express");

const router = express.Router();
const Joi = require("joi");
const userService = require("../services/userService");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const lectureService = require("../services/lectureService");
const validate = require("../utils/validate");

const lectureCreateSchema = Joi.object({
  lectureName: Joi.string().min(4).max(160).required(),
});

// Create lecture
router.post("/", verifyToken, async (req, res) => {
  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  validate(lectureCreateSchema, req.body);
  const { lectureName } = req.body;
  const lectureId = parseInt(req.user.id, 10);
  const data = {
    lectureName,
    lectureId,
  };

  const newLecture = await lectureService.createLecture(data);
  return res.status(200).json(newLecture);
});

// Get lecture feedback
router.get("/:id/feedback", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const lecture = await lectureService.getLectureById(id);

  if (!lecture) throw new CustomError(404, "Lecture not found");

  const feedback = await lectureService.getAllFeedbacksOfLecture(id);
  if (!feedback) throw new CustomError(404, "Feedback not found");

  return res
    .status(200)
    .json({ message: "Feedback found succesfully", feedback });
});

module.exports = router;
