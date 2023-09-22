const express = require("express");

const router = express.Router();
const userService = require("../services/userService");
const verifyToken = require("../middlewares/verifyToken");
const CustomError = require("../utils/CustomError");

// get all feedback of spesific course
router.get("/:id", verifyToken, async (req, res) => {
    
})

// create new feedback

// feedback from spesific user

