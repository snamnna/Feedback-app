const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY || 'oletusavain'
const database = process.env.DATABASE_URL

// TODO: Decide user authentication with/without token and refactor

//Authenticate User (without token)
router.post("/api/auth", async (req, res) => {

    try {
        const { username, password } = req.body;

        // Check if user exists in database
        const user = await userService.checkUserExists(username);

      if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      //Compare passwords
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return res.status(200).json({ message: "User Logged in Successfully" });
        }

        console.log(err);
        return res.status(401).json({ message: "Invalid Credentials" });
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });

//authenticate token
router.get("/api/auth", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({ message: "Token authenticated", authData})
        }
    })
})

//Funktion that is used in token auth
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]

    if (typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}


// TODO: Myöhemmin delete / edit user

module.exports = router









//Alla vanha user authentication jota en uskaltanu vielä poistaa :D




/**
 * //authenticate user / login
router.post('/api/auth', async (req, res) => {


    if(userExists){
        const isValidPassword = await userService.validatePassword(username, password);

        if (isValidPassword) {
            //Generate jwt
            const token = jwt.sign(user, secretKey, {expiresIn: '1h'})
            res.send({
                token
            })
        } else {
            res.status(401).send({
                error: 'Invalid username or password'
            })
        }
    }
    else {
        res.status(401).send({ error: 'User does not exist' });
    }
})
 */
