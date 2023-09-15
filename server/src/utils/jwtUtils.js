const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'oletus'


//Function for signing token, using user object
//Three arguments should be legal here?
function tokenSign(user){
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h'})
    return token
}

//Function for token decoding
function tokenDecode(token){
    try{
        const decoded = jwt.verify(token, secretKey)
        return decoded
    } catch (err){
        return null
    }
}

//Second function for token decoding, which one is better?
function tokenDecode2(token){
    const decoded = jwt_decode(token)
    return decoded
}

module.exports = { tokenSign, tokenDecode, tokenDecode2 } //Vaihda tähän se decode kumpi on oikea
