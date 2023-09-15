const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// check if course exists already in database
async function checkCourseExists(name, lecturer) {
    const course = await prisma.course.findUnique({
        where: {
            name: name,
            lecturer: lecturer
        }
    })
}

//create new course to database
async function createCourse(name, description, lecturer, lectures, enrollments){
    const course = await prisma.course.create({
        data: {
            name: name,
            description: description,
            lecturer: lecturer,
            lectures: lectures,
            enrollments: enrollments
        }
    })
}

// delete course from database
async function deleteCourse(name, lecturer){
    const deleteCourse = await prisma.course.delete({
        where: {
            name: name,
            lecturer: lecturer
        },
    })
}

//edit course in db
async function editCourse(name, description, lecturer, lectures, enrollments) {
    const updateCourse = await prisma.course.update({
        where: {
            name: name,
            description: description,
            lecturer: lecturer,
            lectures: lectures,
            enrollments: enrollments
        },
        data: {
            name: name,
            description: description,
            lecturer: lecturer,
            lectures: lectures,
            enrollments: enrollments
        }
    })
}

// get all courses from db
//TODO: myöhemmin käyttäjän mukaan
async function getAllCourses(){
    const courses = await prisma.course.findMany()
}

// get all participants of specific course
async function getAllParticipants(name, lecturer){
    const course = await prisma.course.findUnique({
        where: {
            name: name,
            lecturer: lecturer
        },
        select: {
            enrollments: true,
        },
    })
}

//get all lectures of specific course
async function getAllLectures(name, lecturer){
    const course = await prisma.course.findUnique({
        where: {
            name: name,
            lecturer: lecturer
        },
        select: {
            lectures: true,
        },
    })
}

module.exports = {
    checkCourseExists,
    createCourse,
    deleteCourse,
    editCourse,
    getAllCourses,
    getAllParticipants,
    getAllLectures
};