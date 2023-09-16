const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'oletus'

// generic function for token signing
function tokenSign(payload) {
    return jwt.sign(payload, secretKey, {expiresIn: '1h'})
}

// function for token decoding
function tokenDecode(token) {
    return jwt.verify(token, secretKey, (err, data) => {
        if (err) {
            throw err
        } else {
            return data
        }
    })
}

module.exports = {tokenSign, secretKey, tokenDecode} //Vaihda tähän se decode kumpi on oikea
