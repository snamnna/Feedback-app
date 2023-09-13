const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'oletus'

//Function for signing token, using user object
//Three arguments should be legal here?
function tokenSign(user){
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h'})
    return token
}

//Function for token decoding
function tokenVerify(token){
    try{
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (err){
        return null
    }
}

module.exports = { tokenSign, tokenVerify }
