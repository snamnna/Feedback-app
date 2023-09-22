const express = require("express");

const bcrypt = require("bcrypt");
const CustomError = require("../utils/CustomError");

const router = express.Router();
const userService = require("../services/userService");
const jwtUtils = require("../utils/jwtUtils");
const Joi = require("joi");
const validate = require("../utils/validate");

const authSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
});

// Authenticate User
router.post("/", async (req, res) => {
  validate(authSchema, req.body);
  const { username, password } = req.body;

  // Check if user exists in database
  const user = await userService.getUserByUsername(username);

  // If user doesn't exist or password is incorrect, throw error
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    throw new CustomError(401, "Invalid Credentials");

  const token = await jwtUtils.tokenSign(user);

  return res
    .status(200)
    .json({ message: "User Logged in Successfully", token, user });
});

module.exports = router;
