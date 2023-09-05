

async function checkUserExists(username) {
//todo: haetaan tietokannasta löytyykö useria
}

async function createUser(username,password){
    //TODO: luodaan tietokantaan uusi user
}

async function deleteUser(username,password){
    //TODO: poistetaan käyttäjä tietokannasta
}
async function validatePassword(username, password){
    //TODO: vertaa salasanaa tietokantaan
}
module.exports = {
    checkUserExists,
    createUser,
    deleteUser,
    validatePassword
};