const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const CustomError = require("../utils/CustomError");
const Joi = require("joi");
const validate = require("../utils/validate");

const registrationSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(4).required(),
});

//Register
router.post("/", async (req, res) => {
  validate(registrationSchema, req.body);
  const { username, password } = req.body;
  const userExists = await userService.getUserByUsername(username);

  if (userExists) throw new CustomError(401, "Email already in use");

  const saltRounds = 10;

  // Hashing password
  //Tarvitsisiko tähän kuitenkin try catch vielä?
  const hash = await bcrypt.hash(password, saltRounds);
  await userService.createUser(username, hash);

  //Successfull message, no need to return
  return res.status(200).json({ message: "User created successfully" });
});

module.exports = router;
