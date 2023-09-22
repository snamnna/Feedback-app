const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
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
router.get("/:id", verifyToken, async (req, res) => {});

// create new feedback

// feedback from spesific user

module.exports = router;
