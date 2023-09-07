const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY || 'oletusavain'
const database = process.env.DATABASE_URL

//Registration


router.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await userService.checkUserExists(username);

        if (userExists) {
            console.log("käyttäjänimi/käyttäjä löytyy jo")

            return res.status(401).json({ message: "Email is already in use." });
        }

        const saltRounds = 10;

        // Hashing password
        const hash = await bcrypt.hash(password, saltRounds);

        const nuser = await  userService.createUser(username, hash);


        res.json({ message: "User created successfully", user: nuser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;