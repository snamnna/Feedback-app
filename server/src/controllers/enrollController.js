const express = require("express");

const router = express.Router();
const Joi = require("joi");
const courseService = require("../services/courseService");
const feedbackService = require("../services/feedbackService");
const enrollService = require("../services/courseEnrollmentService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");

// const enrollCreateSchema = Joi.object({
//   enrollmentStatus: Joi.string()
//     .valid("REJECTED", "PENDING", "APPROVED")
//     .required(),
//   userId: Joi.number().integer().required(),
//   courseId: Joi.number().integer().required(),
// });

// Create enrollment
router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const courseId = parseInt(req.body.courseId, 10);

  const data = {
    userId,
    courseId,
  };

  // const validation = enrollCreateSchema.validate(data);

  // if (validation.error) {
  //   throw new CustomError(400, "Invalid feedback data");
  // }

  const newEnroll = await enrollService.createEnrollment(data);

  return res.status(200).json({ message: "Enrollment successfull", newEnroll });
});

// Update enrollment
router.put("/", verifyToken, async (req, res) => {
  const { status } = req.body;
  const userId = parseInt(req.body.userId, 10);
  const courseId = parseInt(req.body.courseId, 10);
  const enroll = await enrollService.getEnrollById(userId, courseId);
  const data = { courseId, userId, status };

  if (!enroll) throw new CustomError(404, "Enrollment not found");

  if (userId === req.user.id && status === "REJECTED") {
    const deleteEnrollment = await enrollService.deleteEnrollment(data);
    return res
      .status(200)
      .json({ message: "Enrollment deleted", deleteEnrollment });
  }

  if (req.user.userType !== "TEACHER") {
    return res.status(403).json({ message: "Permission denied" });
  }

  let updatedEnroll;

  if (status === "REJECTED") {
    updatedEnroll = enrollService.deleteEnrollment(data);
  } else {
    updatedEnroll = enrollService.updateEnrollment(data);
  }

  return res
    .status(200)
    .json({ message: "Enrollment updated successfully", updatedEnroll });
});

// Kurssin enrollments ja user enrollments can be found from other controllers

module.exports = router;
