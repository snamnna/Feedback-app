const express = require('express')
const app = express()
const port = 3001
const authController = require('./controllers/authController')
const cors = require('cors');

const regController = require('./controllers/regController')


app.use(cors());
app.use(express.json());

app.use('/', authController)
app.use('/', regController)

/*
app.get('/', (req, res) => {

})

//Käytetään authcontrolleria reitin hallintaan
app.use('/', authController)

app.patch('/', (req, res) => {
match the
})

app.delete('/', (req, res) => {

})
*/



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})