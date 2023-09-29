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

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error("User creation failed:", error);
    throw error;
  }
};
