import axios from "axios";

const BASE_URL = "/api/lectures";

const createLecture = async (lecture, token) => {
  try {
    const response = await axios.post(BASE_URL, lecture, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lecture creation failed:", error);
    throw error;
  }
};

const updateLecture = async (lectureId, lecture, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/${lectureId}`, lecture, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lecture update failed:", error);
    throw error;
  }
};

const deleteLecture = async (lectureId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("lecture deletion failed");
  }
};

export default {
  createLecture,
  updateLecture,
  deleteLecture,
};
