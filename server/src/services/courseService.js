/**
 * @module server/courseService
 * @description Provides functions for managing courses, lectures, and enrollments in a database.
 */

const prisma = require("../utils/prisma");

/**
 * @description Returns lectures and enrollments of searched course by id.
 * @param {number} id - The id of the course.
 * @returns {Promise} - The course object.
 */
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

/**
 * @description Returns all the data of searched course by name.
 * @param {string} name - The name of the course.
 * @returns {Promise} - An array of course objects matching the name.
 */
async function getCourseByName(name) {
  return prisma.course.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
}

/**
 * @description Creates a new course in the database.
 * @param {Object} courseData - The data for the new course.
 * @returns {Promise} - The created course object.
 */
async function createCourse(courseData) {
  return prisma.course.create({
    data: courseData,
  });
}

/**
 * @description Deletes a course from the database and returns the deleted data.
 * @param {number} courseId - The id of the course to delete.
 * @returns {Promise} - The deleted course data.
 */
async function deleteCourse(courseId) {
  // Delete all lectures in the course first
  await prisma.lecture.deleteMany({
    where: {
      courseId,
    },
  });

  // Then delete course
  const deletedCourse = await prisma.course.delete({
    where: {
      id: courseId,
    },
  });

  return deletedCourse;
}

/**
 * @description Edits a course in the database and returns all of its data.
 * @param {number} id - The id of the course to edit.
 * @param {string} name - The new name of the course.
 * @param {string} description - The new description of the course.
 * @returns {Promise} - The updated course object.
 */
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

/**
 * @description Returns all courses from the database.
 * @returns {Promise} - An array of all course objects.
 */
async function getAllCourses() {
  return prisma.course.findMany({});
}

/**
 * @description Gets all enrollments of a specific course with the status 'APPROVED'.
 * @param {number} id - The id of the course.
 * @returns {Promise} - The participants data.
 */
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

/**
 * @description Gets all enrollments of a specific course with the status 'PENDING'.
 * @param {number} courseId - The id of the course.
 * @returns {Promise} - An Array of enrollments with 'PENDING' status.
 */
async function getEnrollments(courseId) {
  return prisma.courseEnrollment.findMany({
    where: {
      courseId,
      status: "PENDING",
    },
  });
}

/**
 * @description Returns all lectures of a specific course.
 * @param {number} id - The id of the course.
 * @returns {Promise} - The lectures' data.
 */
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
