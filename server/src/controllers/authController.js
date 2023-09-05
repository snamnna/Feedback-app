const express = require('express')
const app = express()
const userService = require('../services/userService');

//authenticate user
app.post('/api/auth', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await userService.checkUserExists(username);

    if(userExists){
        const isValidPassword = await userService.validatePassword(username, password);

        if (isValidPassword(username, password)) {
            // TODO: Generate JWT
            res.send({
                token: '1234'
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