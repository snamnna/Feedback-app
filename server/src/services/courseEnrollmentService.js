const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// create new enrollment to database and return enrollment data
async function createEnrollment(userId, courseId) {
    return prisma.course.create({
        data: {
            userId,
            courseId,
        }
    });
}

//update enrollment in db and return updated enrollment
async function updateEnrollment(userId, courseId) {
    return prisma.course.update({
        where: {
            userId,
            courseId
        },
        data: {
            userId,
            courseId
        },
    });
}

//delete enrollment from db and return deleted data
async function deleteEnrollment(userId, courseId) {
    return prisma.course.delete({
        where: {
            userId,
            courseId
        }
    });
}

// get all enrollments for course by courseId
async function getCourseEnrollmentsByCourseId(courseId) {
    return prisma.course.findMany({
        where: {
            courseId,
        },
    });
}
// get all courses enrolled by userId
async function getUserEnrollmentsByUserId(userId) {
    return prisma.course.findMany({
        where: {
            userId,
        },
    });
}

module.exports = {
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getCourseEnrollmentsByCourseId,
    getUserEnrollmentsByUserId,
};