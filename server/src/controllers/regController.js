const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY || 'oletusavain'
const database = process.env.DATABASE_URL

//Registration
router.post("/api/auth", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await userService.checkUserExists(username);

        if (userExists) {
            return res.status(401).json({ message: "Email is already in use." });
        }

        const saltRounds = 10;

        // Hashing password
        const hash = await bcrypt.hash(password, saltRounds);

        // Creating a new user with hashed password

        //TODO: Esimerkistä metodi User, millä korvataan?
        const newUser = new userService.User({
            username,
            password: hash,
        });

        // Connecting to the database

        //TODO: Metodi esimerkistä, tällainen pitäisi tehdä userserviceen?
        await userService.connectToDatabase(database);

        // Saving the user to the database
        await newUser.save();

        res.json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
