const prisma = require("../utils/prisma");

// create new enrollment to database and return enrollment data
async function createLecture(name, courseId) {
    return prisma.lecture.create({
        data: {
            name,
            courseId,
        },
    });
}

//update enrollment in db and return updated enrollment
async function updateLecture(id, courseId, name) {
    return prisma.lecture.update({
        where: {
            id,
            courseId,
        },
        data: {
            name,
        },
    });
}

//delete enrollment from db and return deleted data
async function deleteLecture(id, courseId) {
    return prisma.lecture.delete({
        where: {
            id,
            courseId,
        },
    });
}


async function getAllFeedbacksOfLecture(id, courseId) {
    return prisma.lecture.findMany({
        where: {
            id,
            courseId,
        },
        include: {
            feedback: true,
        },
    });
}

module.exports = {
    createLecture,
    updateLecture,
    deleteLecture,
    getAllFeedbacksOfLecture,
};