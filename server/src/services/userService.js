const {PrismaClient} = require('@prisma/client')


const prisma = new PrismaClient()

// get user by username
async function getUserByUsername(username) {
    return prisma.user.findUnique({
        where: {
            username: username,
        },
    })
}

async function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

//luodaan tietokantaan uusi user
async function createUser(username, password) {
    const user = await prisma.user.create({
        data: {
            username: username,
            password_hash: password,
        }
    })
}

// poistetaan käyttäjä tietokannasta
async function deleteUser(username, password) {
    const deleteUser = await prisma.user.delete({
        where: {
            username: username,
            password: password
        },
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
        },
        select: {
            username: true
        }
    })
}

// todo: voisko nimee paremmin? Et nimestä jo näkis että tää hakee kurssit missä käyttäjä on lecturer
// courses by user
async function getUserCourses(user) {
    const course = await prisma.course.findMany({
        where: {
            user: user
        },
        select: {
            courses: true
        }
    })
}

module.exports = {
    getUserByUsername,
    createUser,
    deleteUser,
    editUser,
    getUserById
};