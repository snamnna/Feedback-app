const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const jwtUtils = require("../utils/jwtUtils");

// Authenticate User
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in database
  const user = await userService.getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  // todo: tässä vois käyttää custom erroria ja error handleria
  // todo: custom errorin saa heitettyä esim. throw new CustomError(404, "User not found");
  // todo: error handler sit käsittelee ne errorit ja palauttaa ne fronttiin
  // Compare passwords
  const token = bcrypt.compare(password, user.password_hash, (err, result) => {
    if (result) {
      return jwtUtils.tokenSign(user);
    }
    console.log(err);
    return res.status(401).json({ message: "Invalid Credentials" });
  });

  return res
    .status(200)
    .json({ message: "User Logged in Successfully", token });
});

module.exports = router;
