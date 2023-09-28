import axios from "axios";

const BASE_URL = "/api/feedback";

const newFeedback = async (feedback) => {
  try {
    const response = await axios.post(BASE_URL, feedback);
    return response.data;
  } catch (error) {
    console.error("giving feedback failed:", error);
    throw error;
  }
};

const courseFeedback = async (courseId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getting feedback for course failed:", error);
    throw error;
  }
};

const lectureFeedback = async (lectureId) => {
  try {
    const response = await axios.get(`/api/lectures/${lectureId}/feedback`);
    return response.data;
  } catch (error) {
    console.error("getting feedback for lecture failed:", error);
    throw error;
  }
};
const userFeedback = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("getting user feedback failed:", error);
    throw error;
  }
};

export default {
  courseFeedback,
  lectureFeedback,
  userFeedback,
  newFeedback,
};