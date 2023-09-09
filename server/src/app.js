const express = require('express')
const app = express()
const authController = require('./controllers/authController')
const regController = require('./controllers/regController')
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}, body: ${JSON.stringify(req.body)}`)
    next()
})

//Käytetään authcontrolleria reitin hallintaan
app.use('/api/auth', authController)

//Käytetään regcontrolleria reitin hallintaan
app.use('/api/register', regController)

module.exports = app
