const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'oletus'

//Function for signing token
function tokenSigning(user){
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h'})
    return token
}