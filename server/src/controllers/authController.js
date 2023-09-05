const express = require('express')
const app = express()

//authenticate user
app.post('/api/auth', (req, res) => {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        // TODO: Generate JWT
        res.send({
            token: '1234'
        })
    } else {
        res.status(401).send({
            error: 'Invalid username or password'
        })
    }
})