const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {

})

app.patch('/', (req, res) => {

})

app.delete('/', (req, res) => {
    
})

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})