const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get all feedback of specific course
  async function getCourseFeedback(id) {
    return prisma.course.findUnique({
      where: {
        id
      },
      include: {
        feedback: true
      }
    })
  }

  // create feedback
  async function createFeedback(feedbackData) {
    return prisma.feedback.create({
      data: feedbackData
    })
  }

  // get user feedback
  async function getUserFeedback(userId) {
    return prisma.feedback.findUnique({
      where: {
        userId
      },
      include: {
        feedback: true
      }
    })
  }

  module.exports = {
    getCourseFeedback, createFeedback
  }
