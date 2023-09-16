const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt');

//Authenticate User
router.post("/", async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists in database
    const user = await userService.getUserByUsername(username);

    if (!user) {
        return res.status(401).json({message: "Invalid Credentials"});
    }

    // Compare passwords
    bcrypt.compare(password, user.password_hash, (err, result) => {
        if (result) {
            const token = jwtUtils.tokenSign(user)
            return res.status(200).json({message: "User Logged in Successfully", token});
        }
        console.log(err);
        return res.status(401).json({message: "Invalid Credentials"});
    });
});


module.exports = router

