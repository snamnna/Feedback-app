import axios from "axios";

const BASE_URL = "/api/courses";

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

const updateCourse = async (courseId, course, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${courseId}`, course, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Course update failed:", error);
    throw error;
  }
};

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

const getEnrollments = async (courseId, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}/enrollments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Enrollments retrieval failed", error);
    throw error;
  }
};

const courseEnrollment = async (courseId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/${courseId}/enroll`, {
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

const deleteEnroll = async (courseId, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/${courseId}/deleteEnroll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Leaving course failed", error);
    throw error;
  }
};

export default {
  createCourse,
  updateCourse,
  getCourseStudents,
  courseEnrollment,
  deleteCourse,
  deleteEnroll,
  getEnrollments,
};
