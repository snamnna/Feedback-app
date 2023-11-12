const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const userService = require("../services/userService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");
const validate = require("../utils/validate");

const userUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
});

const userTypeUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  userType: Joi.string().valid("STUDENT", "TEACHER", "ADMIN"),
});

// Get user
router.get("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (Number.isNaN(userId)) throw new CustomError(400, "Invalid user ID");
  const user = userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  res.json(user);
});

// Update user
router.put("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  validate(userUpdateSchema, { ...req.body, id: userId });
  if (userId !== req.user.id)
    throw new CustomError(403, "No permission to update user information");

  const { username, password } = req.body;
  if (!username || !password) throw new CustomError(400, "Bad Request");

  // validation for username
  if (!/^[A-Za-z][A-Za-z0-9-_]{3,23}$/.test(username)) {
    throw new CustomError(400, "Username is not valid.");
  }

  // validation for password
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{8,24}$/.test(password)
  ) {
    throw new CustomError(400, "Password is not valid.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updated = await userService.editUser(userId, username, hashedPassword);
  return res.json(updated);
});

// Delete user
router.delete("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId !== req.user.id) throw new CustomError(403, "Unauthorized");
  const user = await userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  await userService.deleteUser(userId);
  return res.status(200).json({ message: "User deleted successfully" });
});

// Get user courses
router.get("/:id/courses", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  const courses = await userService.getUserCourses(userId);
  return res.status(200).json({ ...courses });
});

// Get user by username (admin function)
router.get("/name/:username", verifyToken, async (req, res) => {
  if (req.user.userType !== "ADMIN") throw new CustomError(403, "No permission");
  if (!req.params.username) throw new CustomError(400, "Missing input");

  const userName = req.params.username;
  const user = await userService.getUserByUsername(userName);
  if (!user) throw new CustomError(404, "User not found");
  res.json(user);
});

// Modify user type (admin function)
router.put("/:id/type", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  validate(userTypeUpdateSchema, { ...req.body, id: userId });

  if (req.user.userType !== "ADMIN")
    throw new CustomError(403, "No permission to modify user type");

  const { userType } = req.body;
  if (!userType) throw new CustomError(400, "Bad Request");

  const updatedUser = await userService.editUserType(userId, userType);
  return res
    .status(200)
    .json({ message: "User type updated successfully", updatedUser });
});

module.exports = router;
