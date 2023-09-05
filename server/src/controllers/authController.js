const express = require('express')
const app = express()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY || 'oletusavain'

// TODO: Replace with real user data
const user = { id: 1, username: 'user'}

//authenticate user
app.post('/api/auth', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await userService.checkUserExists(username);

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

//authenticate token
app.post("/api/auth", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({ message: "Token authenticated", authData})
        }
    })
})

//handle login and create token
app.post('/api/login', (req, res) => {
    // TODO: Tässä voisi vielä tarkistaa käyttäjän tiedot ja salasanan ennen tokenin luomista?
    jwt.sign({user: user}, "secretkey", (err, token) => {
        res.json({token})
    })
})

//Funktion that is used in token auth
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]

    if (typeof bearerHeader !== "undefined"){
        const bearerHeader = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}