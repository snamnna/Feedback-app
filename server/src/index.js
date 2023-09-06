const express = require('express')
const app = express()
const port = 3001
const authController = require(controllers/authController)

app.get('/', (req, res) => {

})

//Käytetään authcontrolleria reitin hallintaan
app.use('/', authController)

app.patch('/', (req, res) => {

})

app.delete('/', (req, res) => {
    
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})