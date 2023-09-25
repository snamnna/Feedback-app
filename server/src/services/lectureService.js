const prisma = require("../utils/prisma");

// create new lecture to database and return lecture data
async function createLecture(name, courseId) {
    return prisma.lecture.create({
        data: {
            name,
            courseId,
        },
    });
}

//update lecture in db and return updated lecture
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

//delete lecture from db and return deleted data
async function deleteLecture(id, courseId) {
    return prisma.lecture.delete({
        where: {
            id,
            courseId,
        },
    });
}

// get all feedbacks of spesific lecture in one course
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