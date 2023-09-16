const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");

router.get("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  res.json(user);
});

router.put("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId !== req.user.id)
    throw new CustomError(403, "No permission to update user information");

  const { username, password } = req.body;
  if (!username || !password) throw new CustomError(400, "Bad Request");

  const updated = await userService.editUser(username, password);
  return res.json(updated);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId !== req.user.id) throw new CustomError(403, "Unauthorized");
  const user = await userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  // if (!username || !password) {
  //   return res.status(400).json({ eroor: "Username and password required" });
  // }
  // const updated = await userService.deleteUser(username, password);
  // res.json(updated);
  return res.status(200).json({ message: "User deleted successfully" });
});

router.get("/:id/courses", verifyToken, async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userService.getUserById(userId);
  if (!user) throw new CustomError(404, "User not found");
  const courses = await userService.getUserCourses(userId);
  return res.status(200).json({ ...courses });
});

module.exports = router;
