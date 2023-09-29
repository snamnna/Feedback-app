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

//TODO:: varmista toimiiko
const courseEnrollment = async (courseId, data, token) => {
  try {
    const res = await axios.put(`/api/enroll/${courseId}/`, data, {
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

//TODO: varmista onko oikein
const acceptEnrollment = async (courseId, userId, token) => {
  try {
    const response = await axios.put(
      `/api/enroll/${courseId}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Enrollment acceptance failed:", error);
    throw error;
  }
};

//TODO: lisää status "REJECTED" sinne mis tätä kutsutaan
const rejectEnrollment = async (courseId, userId, enrollmentStatus, token) => {
  try {
    const response = await axios.put(
      `/api/${courseId}/${userId}`,
      { enrollmentStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Enrollment rejection failed:", error);
    throw error;
  }
};

//TODO: missä kutsutaan lisää userID ja varmisutetaan että backis oikein varmaan tarvitaan kurssi ja userId
const deleteEnroll = async (courseId, userId, token) => {
  try {
    const res = await axios.put(`api/enroll/${courseId}/${userId}`, {
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
  acceptEnrollment,
  rejectEnrollment,
};
