const prisma = require("../utils/prisma");

// create new lecture to database and return lecture data
async function createLecture({ courseId, lectureName }) {
  return prisma.lecture.create({
    data: {
      name: lectureName,
      courseId,
    },
  });
}

// update lecture in db and return updated lecture
async function updateLecture(id, name) {
  return prisma.lecture.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

// delete lecture from db and return deleted data
async function deleteLecture(id) {
  return prisma.lecture.delete({
    where: {
      id,
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
    select: {
      feedback: true,
    },
  });
}

// get lecture by id and return lecture data
async function getLectureById(id) {
  return prisma.lecture.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  createLecture,
  updateLecture,
  deleteLecture,
  getAllFeedbacksOfLecture,
  getLectureById,
};
