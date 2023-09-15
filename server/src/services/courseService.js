const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// check if course exists already in database
async function getCourseById(id) {
    const course = await prisma.course.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
            description: true,
            lecturer: true,
            lectures: true,
            enrollments: true
        },

    })
}

async function getCourseByName(name) {
    const course = await prisma.course.findUnique({
        where: {
            name: name
        },
        select: {
            id: true,
            description: true,
            lecturer: true,
            lectures: true,
            enrollments: true
        },
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
        },
        select: {
            id: true,
            name: true,
            description: true,
            lecturer: true,
            lectures: true,
            enrollments: true
        },
    })
}

// delete course from database
async function deleteCourse(id){
    const deleteCourse = await prisma.course.delete({
        where: {
            id: id
        },
    })
}

//edit course in db
async function editCourse(id, name, description, lecturer, lectures, enrollments) {
    const updateCourse = await prisma.course.update({
        where: {
            id: id
        },
        data: {
            name: name,
            description: description,
            lecturer: lecturer,
            lectures: lectures,
            enrollments: enrollments
        },
        select: {
            id: true,
            name: true,
            description: true,
            lecturer: true,
            lectures: true,
            enrollments: true
        },
    })
}

// get all courses from db
async function getAllCourses(){
    const courses = await prisma.course.findMany()
}

// get all participants of specific course
async function getAllParticipants(id){
    const course = await prisma.course.findUnique({
        where: {
            id: id
        },
        select: {
            enrollments: true,
        },
    })
}

//get all lectures of specific course
async function getAllLectures(id){
    const course = await prisma.course.findUnique({
        where: {
            id: id
        },
        select: {
            lectures: true,
        },
    })
}

module.exports = {
    getCourseById,
    getCourseByName,
    createCourse,
    deleteCourse,
    editCourse,
    getAllCourses,
    getAllParticipants,
    getAllLectures
};