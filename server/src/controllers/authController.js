const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY || 'oletusavain'

//Authenticate User
router.post("/", async (req, res) => {

    try {
        const { username, password } = req.body;

        // Check if user exists in database
        const user = await userService.checkUserExists(username);

      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      //Compare passwords
      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (result) {
            //Sending token to frontend and message
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h'});
            return res.status(200).json({ message: "User Logged in Successfully", token });
        }

        console.log(err);
        return res.status(401).json({ message: "Invalid Credentials" });
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });


// Funktion that is used in token auth (not used currently)
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

// TODO: Myöhemmin delete / edit user

module.exports = router

