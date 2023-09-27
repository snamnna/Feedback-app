const express = require("express");

const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const lectureService = require("../services/lectureService");
const validate = require("../utils/validate");
const { verify } = require("jsonwebtoken");

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
    .json({ message: "Feedback found successfully", feedback });
});

// Update lecture
router.put("/:id", verifyToken, async (req, res) => {
  const lectureId = parseInt(req.params.id, 10);
  const lecture = await lectureService.getLectureById(lectureId);
  const { lectureName } = req.body;

  if (!lecture) throw new CustomError(404, "Lecture can not be found");

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  const updatedLecture = await lectureService.updateLecture(lectureId, {
    lectureName,
  });

  return res
    .status(200)
    .json({ message: "Lecture updated successfully", updatedLecture });
});

// Delete lecture
router.delete("/:id", verifyToken, async (req, res) => {
  const lectureId = parseInt(req.params.id, 10);
  const lecture = await lectureService.getLectureById(lectureId);

  if (!lecture) throw new CustomError(404, "Lecture not found");

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  await lectureService.deleteLecture(lectureId);
  return res.status(200).json({ message: "Lecture deleted successfully" });
});

module.exports = router;
