const prisma = require("../utils/prisma");

// get all feedback of specific course
async function getCourseFeedback(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    select: {
      lectures: {
        select: {
          feedback: true,
        },
      },
    },
  });
}

// create feedback
async function createFeedback(feedbackData) {
  return prisma.feedback.create({
    data: feedbackData,
  });
}

// get user feedback
async function getUserFeedback(userId) {
  return prisma.feedback.findMany({
    where: {
      userId,
    },
  });
}

// check if user has already given feedback to lecture
async function getUserLectureFeedback(userId, lectureId) {
  return prisma.feedback.findMany({
    where: {
      userId,
      lectureId,
    },
  });
}

module.exports = {
  getCourseFeedback,
  createFeedback,
  getUserFeedback,
  getUserLectureFeedback,
};
