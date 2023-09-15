const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//haetaan tietokannasta löytyykö kurssia
async function checkCourseExists(id, owner) {
    const course = await prisma.course.findUnique({
        where: {
            id: id,
            owner: owner,
        }
    })
}

//luodaan tietokantaan uusi kurssi
async function createCourse(owner){
    const course = await prisma.course.create({
        data: {
            owner: owner

        }
    })
}

// poistetaan kurssi tietokannasta
async function deleteCourse(id, owner){
    const deleteCourse = await prisma.course.delete({
        where: {
            id: id,
            owner: owner
        },
    })
}

//muokataan kurssia
async function editCourse(id, owner) {
    const updateCourse = await prisma.course.update({
        where: {
            id: id,
            owner: owner
        },
        data: {
            id: id,
            owner: owner
        }
    })
}
async function getAllCourses(){
    const courses = await prisma.course.findMany()
}

//TODO: getParticipants(courseId)
//TODO: getLectures(id)

module.exports = {
    checkCourseExists,
    createCourse,
    deleteCourse,
    editCourse,
    getAllCourses
};