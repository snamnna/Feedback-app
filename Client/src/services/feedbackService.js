import axios from "axios";

const BASE_URL = "/api/feedback";

const newFeedback = async (feedback, token) => {
  try {
    const response = await axios.post(BASE_URL, feedback, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Mennöön clientin sendissä");
    return response.data;
  } catch (error) {
    console.error("giving feedback failed:", error);
    throw error;
  }
};

const checkUserFeedbackExists = async (data, token) => {
  try {
    const response = await axios.get(
      `/api/feedback/lecture/user/${data.userId}`,
      {
        params: {
          lectureId: data.lectureId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("service palauttaa", response.data.feedbackExists);
    return response.data.feedbackExists;
  } catch (error) {
    console.error("Checking existing feedback failed:", error);
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
    console.log("raakadata:", response.data);
    return response.data.feedback;
  } catch (error) {
    console.error("getting feedback for course failed:", error);
    throw error;
  }
};

const lectureFeedback = async (data, token) => {
  try {
    const response = await axios.get(
      `/api/lectures/${data.lectureId}/feedback`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("getting feedback for lecture failed:", error);
    throw error;
  }
};
const userFeedback = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  checkUserFeedbackExists,
};
