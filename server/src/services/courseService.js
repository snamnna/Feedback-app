const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// pitäis palauttaa haettu kurssi kontrollerille
// check if course exists already in database
async function getCourseById(id) {
  return prisma.course.findUnique({
    where: {
      id,
    } ,
    include: {
      lectures: true,
      enrollments: true,
    },
  });
}

// pitäis palauttaa haettu kurssi kontrollerille
async function getCourseByName(name) {
  return prisma.course.findUnique({
    where: {
      name,
    }
  });
}

// create new course to database
async function createCourse(name, description, lecturerId) {
  return prisma.course.create({
    data: {
      name,
      description,
      lecturerId,
    }
  });
}

// pitäis palauttaa kontrolleriin se poistettu kurssi
// delete course from database
async function deleteCourse(id) {
  return  prisma.course.delete({
    where: {
      id,
    }
  });
}

// pitäis palauttaa kontrolleriin
// edit course in db
async function editCourse(id, name, description, lectures) {
  return prisma.course.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      lectures
    }
  });
}

// pitäis palauttaa kontrolleriin
// get all courses from db
async function getAllCourses() {
  return prisma.course.findMany({});
}

// pitäis palauttaa kontrolleriin arvot
// get all participants of specific course
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

// pitäis palauttaa kontrolleriin
// get all lectures of specific course
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
  getAllLectures
};
