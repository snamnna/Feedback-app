const express = require("express");

const router = express.Router();
const Joi = require("joi");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");
const lectureService = require("../services/lectureService");

const feedbackCreateSchema = Joi.object({
  feedbackType: Joi.string().valid("BAD", "GREAT", "NEUTRAL").required(),
  comment: Joi.string().max(160).optional().allow(""),
  lectureId: Joi.number().integer().required(),
});

// get all feedback of specific course
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
  const parsedLectureId = parseInt(lectureId, 10);
  const { user } = req;

  const existingFeedback = await feedbackService.getUserLectureFeedback(
    user.id,
    parsedLectureId,
  );

  if (existingFeedback)
    throw new CustomError(400, "Can't give more than one feedback");

  const lecture = await lectureService.getLectureById(parsedLectureId);

  if (!lecture) throw new CustomError(404, "Lecture not found");

  const data = {
    feedbackType,
    comment,
    lectureId: lecture.id,
    userId: user.id,
  };

  const newFeedback = await feedbackService.createFeedback(data);
  return res
    .status(200)
    .json({ message: "Feedback created successfully", newFeedback });
});

// feedback from specific user
router.get("/user/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }
  const feedback = await feedbackService.getUserFeedback(userId);
  if (!feedback) throw new CustomError(404, "Feedback not found");
  return res
    .status(200)
    .json({ message: "Feedback found successfully", feedback });
});

//check if user has given feedback
router.get("/lecture/user/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const lectureId = parseInt(req.query.lectureId, 10); // Use req.query to get the URL parameter

  const existingFeedback = await feedbackService.getUserLectureFeedback(
    userId,
    lectureId,
  );

  const response = {
    feedbackExists: !!existingFeedback, // Convert the value to a boolean
  };
  // Send the response
  res.status(200).json(response);
});

module.exports = router;
