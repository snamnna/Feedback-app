const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// pitäis palauttaa haettu kurssi kontrollerille
// check if course exists already in database
async function getCourseById(id) {
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true,
      lectures: true,
      enrollments: true,
    },
  });
}

// pitäis palauttaa haettu kurssi kontrollerille
async function getCourseByName(name) {
  const course = await prisma.course.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true,
      lectures: true,
      enrollments: true,
    },
  });
}

// create new course to database
async function createCourse({ name, description, lecturerId }) {
  return prisma.course.create({
    data: {
      name,
      description,
      lecturerId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true
    },
  });
}

// pitäis palauttaa kontrolleriin se poistettu kurssi
// delete course from database
async function deleteCourse(id) {
  const course = await prisma.course.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true,
      lectures: true
    },
  });
}

// pitäis palauttaa kontrolleriin
// edit course in db
async function editCourse(id, name, description, lecturer, lectures, enrollments,) {
  const updateCourse = await prisma.course.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      lecturer,
      lectures,
      enrollments,
    },
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true,
      lectures: true,
      enrollments: true,
    },
  });
}

// pitäis palauttaa kontrolleriin
// get all courses from db
async function getAllCourses() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      lecturer: true,
      lectures: true,
      enrollments: true,
    }
  });
}

// pitäis palauttaa kontrolleriin arvot
// get all participants of specific course
async function getAllParticipants(id) {
  const course = await prisma.course.findUnique({
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
  const course = await prisma.course.findUnique({
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
