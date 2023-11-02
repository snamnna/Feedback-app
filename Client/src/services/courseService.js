import axios from "axios";

const BASE_URL = "/api/courses";

//create a new course
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

//edit course
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

//Delete Course TOIMII
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

//get course participants
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

//get enrollments
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

//add course enrollment
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

// Accept enroll
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

// Reject enroll / delete
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
