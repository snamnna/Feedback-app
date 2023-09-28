import axios from "axios";

const BASE_URL = "/api";

export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth`, loginData);
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/logout`);
    return res.data;
  } catch (error) {
    // Handle any errors that occur during the logout process
    console.error("Logout failed:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error("User creation failed:", error);
    throw error;
  }
};

export const getUserCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/:id/courses`);
    return response.data;
  } catch (error) {
    console.log("getting user courses failed", error);
    throw error;
  }
};

export const editUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("User edit failed:", error);
    throw error;
  }
};
