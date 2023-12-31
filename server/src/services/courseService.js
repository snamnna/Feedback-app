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
  return prisma.course.findMany({
    where: {
      name: {
        contains: name,
      },
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
async function deleteCourse(courseId) {
  // delete all lectures in the course first
  await prisma.lecture.deleteMany({
    where: {
      courseId: courseId,
    },
  });

  // then delete course
  const deletedCourse = await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return deletedCourse;
}

// edit course in db and returns all of it's data
async function editCourse(id, name, description) {
  return prisma.course.update({
    where: {
      id,
    },
    data: {
      name,
      description,
    },
  });
}

// returns all courses from db
async function getAllCourses() {
  return prisma.course.findMany({});
}

// get all enrollments
async function getParticipants(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    select: {
      enrollments: {
        where: {
          status: "APPROVED",
        },
        select: {
          user: true,
        },
      },
    },
  });
}

// get all participants of specific course who has the status approved
async function getEnrollments(courseId) {
  return prisma.courseEnrollment.findMany({
    where: {
      courseId,
      status: "PENDING",
    },
  });
}

// returns all lectures of specific course
async function getAllLectures(id) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    select: {
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
  getEnrollments,
  getParticipants,
  getAllLectures,
};
