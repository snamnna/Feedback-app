import axios from "axios";

const BASE_URL = "/api/courses";

const createCourse = async (course) => {
  try {
    const response = await axios.post(BASE_URL, course);
    return response.data;
  } catch (error) {
    console.error("Course creation failed:", error);
    throw error;
  }
};

const getCourses = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error("Course retrieval failed:", error);
    throw error;
  }
};

const getCourse = async (courseId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}`);
    return res.data;
  } catch (error) {
    console.error("Course retrieval failed:", error);
    throw error;
  }
};

const updateCourse = async (courseId, course) => {
  try {
    const response = await axios.put(`${BASE_URL}/${courseId}`, course);
    return response.data;
  } catch (error) {
    console.error("Course update failed:", error);
    throw error;
  }
};

const getCourseStudents = async (courseId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${courseId}/participants`);
    return res.data;
  } catch (error) {
    console.error("Course students retrieval failed:", error);
    throw error;
  }
};

export default {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  getCourseStudents,
};