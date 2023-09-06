const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//haetaan tietokannasta löytyykö useria
async function checkUserExists(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
}

//luodaan tietokantaan uusi user
async function createUser(username,password){
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
}

// poistetaan käyttäjä tietokannasta
async function deleteUser(username,password){
    const deleteUser = await prisma.user.delete({
        where: {
            username: username,
            password: password
        },
    })
}

//vertaa salasanaa tietokantaan
async function validatePassword(username, password){
    const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    })
}

//muokataan käyttäjää
async function editUser(username, password) {
    const updateUser = await prisma.user.update({
        where: {
            username: username,
            password: password
        },
        data: {
            username: username,
            password: password
        }
    })
}

module.exports = {
    checkUserExists,
    createUser,
    deleteUser,
    validatePassword,
    editUser
};