const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get all feedback of specific course
  async function getCourseFeedback(id) {
    return prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        feedback: true,
      },
    });
  }

  // create feedback
  async function createFeedback(feedbackData) {
    return prisma.feedback.create({
      data: feedbackData
    })
  }

  module.exports = {
    getCourseFeedback
  }
