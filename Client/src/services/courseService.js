/**
 * @module Client/courseService
 * @description Service module for managing courses on the frontend.
 */

import axios from "axios";

const BASE_URL = "/api/courses";

/**
 * @description Creates a new course.
 * @param {Object} course - The course data.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} The created course data.
 * @throws {Error} If the course creation fails.
 */
const createCourse = async (course, token) => {
  try {
    const response = await axios.post(BASE_URL, course, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Course creation failed:", error);
    throw error;
  }
};

/**
 * @description Edits an existing course.
 * @param {string} courseId - The ID of the course to be updated.
 * @param {Object} data - The updated course data.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} The updated course data.
 * @throws {Error} If the course update fails.
 */
const updateCourse = async (courseId, data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${courseId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("service data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Course update failed:", error);
    throw error;
  }
};

/**
 * @description Deletes a course.
 * @param {string} courseId - The ID of the course to be deleted.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} The deleted course data.
 * @throws {Error} If the course deletion fails.
 */
const deleteCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Course deletion failed");
  }
};

/**
 * @description Gets the participants of a course.
 * @param {string} courseId - The ID of the course.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} A list of course participants.
 * @throws {Error} If the retrieval of course participants fails.
 */
const getCourseStudents = async (courseId, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}/participants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Course students retrieval failed:", error);
    throw error;
  }
};

/**
 * @description Gets the enrollments for a course.
 * @param {string} courseId - The ID of the course.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} A list of course the users enrolled on a course.
 * @throws {Error} If the retrieval of course enrollments fails.
 */
const getEnrollments = async (courseId, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}/enrollments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tää on res.data ", res.data);
    return res.data;
  } catch (error) {
    console.error("Enrollments retrieval failed", error);
    throw error;
  }
};

/**
 * @description Adds enrollment on a course.
 * @param {Object} data - The data for course enrollment.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} The course enrollment data.
 * @throws {Error} If the course enrollment fails.
 */
const courseEnrollment = async (data, token) => {
  try {
    const res = await axios.post(`/api/enroll/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("course enrollment failed", error);
    throw error;
  }
};

/**
 * @description Accepts enrollment on a course.
 * @param {Object} data - The data for course enrollment acceptance.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} The course enrollment data.
 * @throws {Error} If the course enrollment fails.
 */
const acceptEnrollment = async (data, token) => {
  try {
    const response = await axios.put(`/api/enroll/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Enrollment acceptance failed:", error);
    throw error;
  }
};

/**
 * @description Rejects enrollment on a course.
 * @param {Object} data - The data for course enrollment rejection.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} The course enrollment data.
 * @throws {Error} If the course enrollment rejection fails.
 */
const deleteEnrollment = async (data, token) => {
  try {
    const response = await axios.delete(`/api/enroll`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Enrollment rejection failed:", error);
    throw error;
  }
};

/**
 * Gets a course by its ID.
 *
 * @param {string} courseId - The ID of the course.
 * @param {string} token - The user's authentication token.
 * @returns {Promise} Course data.
 * @throws {Error} If getting the course by ID fails.
 */
const getCourseById = async (courseId, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.course;
  } catch (error) {
    console.error("Getting course by id failed", error);
    throw error;
  }
};

export default {
  createCourse,
  updateCourse,
  getCourseStudents,
  courseEnrollment,
  deleteCourse,
  getEnrollments,
  acceptEnrollment,
  deleteEnrollment,
  getCourseById,
};
