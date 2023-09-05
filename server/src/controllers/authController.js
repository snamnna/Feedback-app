const express = require('express')
const app = express()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
const config = process.env

const secretKey = 'salasana'

// TODO: Replace with real user data
const user = { id: 1, username: 'user'}

//authenticate user
app.post('/api/auth', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await userService.checkUserExists(username);

    if(userExists){
        const isValidPassword = await userService.validatePassword(username, password);

        if (isValidPassword(username, password)) {
            // TODO: Generate JWT
            const token = jwt.sign(user, secretKey, {expiresIn: '1h'})

            //Check jwt
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.error('JWT-verify failed: ', err)
                }
                else {
                    console.log('Decoded JWT: ', decoded)
                }
            })

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