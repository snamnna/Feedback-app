const prisma = require("../utils/prisma");

// returns lectures and enrollments of searched course by id
async function getCourseById(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lectures: true,
      enrollments: true,
    },
  });
}

// returns all the data of searched course by name
async function getCourseByName(name) {
  return prisma.course.findUnique({
    where: {
      name,
    },
  });
}

// create new course to database
async function createCourse(courseData) {
  return prisma.course.create({
    data: courseData,
  });
}

// delete course from database and returns deleted data
async function deleteCourse(id) {
  return prisma.course.delete({
    where: {
      id,
    },
  });
}

// edit course in db and returns all of it's data
async function editCourse(id, name, description, lectures) {
  return prisma.course.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      lectures,
    },
  });
}

// returns all courses from db
async function getAllCourses() {
  return prisma.course.findMany({});
}

// get all participants of specific course regardless of the status
async function getAllParticipants(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      enrollments: true,
    },
  });
}

// get all participants of specific course who has the status approved
async function getApprovedParticipants(courseId) {
  return prisma.courseEnrollment.findMany({
    where: {
      courseId,
      status: 'APPROVED',
    },
    select: {
      userId: true,
    },
  });
}

// returns all lectures of specific course
async function getAllLectures(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      lectures: true,
    },
  });
}

module.exports = {
  getCourseById,
  getCourseByName,
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllParticipants,
  getApprovedParticipants,
  getAllLectures,
};
