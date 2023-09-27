const express = require("express");

const router = express.Router();
const Joi = require("joi");
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const enrollService = require("../services/courseEnrollmentService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");

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

// Update enrollment (Opettaja voi hyväksyä tai muokata)
router.put("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const courseId = parseInt(req.params.courseId, 10);
  const enroll = await enrollService.getEnrollById(userId, courseId);
  const { enrollmentStatus } = req.body;

  if (!enroll) throw new CustomError(404, "Enrollment not found");

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  // Teacher updates status
  const updatedEnroll = await enrollService.updateEnrollment(
    courseId,
    { enrollmentStatus },
    userId,
  );

  return res
    .status(200)
    .json({ message: "Enrollment updated successfully", updatedEnroll });
});

// User can update their own enrollment

// Delete enrollment
router.delete("/:id", verifyToken, async (req, res) => {
  const enrollId = parseInt(req.params.userId, 10);
  const enroll = await enrollService.getEnrollById(enrollId);

  if (!enroll) throw new CustomError(404, "Enrollment not found");

  // Only teacher can delete enrollment
  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  await enrollService.deleteEnrollment(enrollId);
  return res.status(200).json({ message: "Enrollment deleted suffecfully" });
});

// Kurssin enrollments ja user enrollments can be found from other controllers

module.exports = router;
