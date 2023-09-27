const express = require("express");

const router = express.Router();
const Joi = require("joi");
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");
const enrollService = require("../services/courseEnrollmentService");

const enrollCreateSchema = Joi.object({
  enrollmentStatus: Joi.string()
    .valid("REJECTED", "PENDING", "APPROVED")
    .required(),
  userId: Joi.number().integer().required(),
  courseId: Joi.number().integer().required(),
});

// Create enrollment
router.post("/:id", verifyToken, async (req, res) => {
  validate(enrollCreateSchema, req.body);
  const { enrollmentStatus, userId, courseId } = req.body;

  const data = {
    enrollmentStatus,
    userId,
    courseId,
  };

  const validation = enrollCreateSchema.validate(data);

  if (validation.error) {
    throw new CustomError(400, "Invalid feedback data");
  }

  const newEnroll = await enrollService.createEnrollment(data);

  return res.status(200).json({ message: "Enrollment successfull", newEnroll });
});

// Update enrollment KESKEN
router.put("/:id", verifyToken, async (req, res) => {
  // Tarvitaanko enrollId etc?
  const userId = parseInt(req.params.id, 10);

  // Tähän tarvitaan metodi jolla hakea yksittäinen enrollment
  const enroll = await enrollService.
});

// Delete enrollment


module.exports = router;
