const express = require('express')
const app = express()
const authController = require('./controllers/authController')
const regController = require('./controllers/regController')

//Käytetään authcontrolleria reitin hallintaan
app.use('/api/auth', authController)

//Käytetään regcontrolleria reitin hallintaan
app.use('/api/register', regController)


