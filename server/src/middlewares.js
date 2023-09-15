const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const userService = require('./services/userService')

//Checks jwt token and gets user info from db
const checkToken = async (req, res, next) => {
    
    const token = req.headers.authorization //Tätä varten tokenin pitää olla headerissa??

    if (!token){
        throw new Error("Token is missing")
    }

    try{
        const decoded = jwt_decode(token)

        const user = userService.checkUserExists()

        if (!user){
            throw new Error("No user found")
        }

        req.user = user
        next()

    } catch (err){
        next(err)
    }
}

//Tähän middleware joka tarkistaa onko palautteiden katselupyynnön lähettänyt opettaja vai oppilas
const checkRole = async(req, res, next) => {

    
}

module.exports = {checkToken} ;
