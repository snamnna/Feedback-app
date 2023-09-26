const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const Joi = require(joi);
const lectureService = require("../services/lectureService");

const lectureCreateSchema = Joi.object({
  lectureName: Joi.string().min(4).max(160).required(),
  lectureId: Joi.number().integer().min(1).required(),
});

//Create lecture
router.post("/lectures", verifyToken, async (req, res) => {
  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  validate(lectureCreateSchema, req.body);
  const { lectureName, lectureId } = req.body;
  const id = parseInt(req.user.id, 10);
  const data = {
    lectureName: lectureName,
    lectureId: lectureId,
  };

  const newLecture = await lectureService.createLecture(data);
  res.status(200).json(newLecture);
});

//Get lecture feedback

module.exports = {
  lectureCreateSchema,
};
