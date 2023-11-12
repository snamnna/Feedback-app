import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/users";

const initialState = {
  user: {
    id: null,
    name: "",
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUserSuccess: (state, action) => {
      state.user.name = action.payload.newName;
      state.user.password = action.payload.newPassword;
      state.error = null;
    },
    editUserFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
    getUserByUsernameSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      console.log("User found by username: " + action.payload.username);
    },
    getUserByUsernameFailure: (state, action) => {
      state.data = null;
      state.error = action.payload;
      console.log("User not found: " + action.payload);
    },
    editUserTypeSuccess: (state, action) => {
      state.user.userType = action.payload;
      state.error = null;
      console.log(
        "User type " +
          action.payload.updatedUser.userType +
          " changed for user ID " +
          action.payload.updatedUser.id
      );
    },
    editUserTypeFailure: (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});

export const {
  editUserSuccess,
  editUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  getUserByUsernameSuccess,
  getUserByUsernameFailure,
  editUserTypeSuccess,
  editUserTypeFailure,
} = userSlice.actions;

export const editUser =
  (userId, newName, newPassword, token) => async (dispatch) => {
    try {
      console.log("newName:", newName);
      console.log("newPassword:", newPassword);
      console.log("token:", token);
      const response = await axios.put(
        `${BASE_URL}/${userId}`,
        { username: newName, password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(editUserSuccess({ newName, newPassword }));
    } catch (error) {
      dispatch(editUserFailure(error.message));
    }
  };

export const deleteUser = (userId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteUserSuccess(response.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};

export const getUserByUsername = (username, token) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserByUsernameSuccess(response.data));
  } catch (error) {
    dispatch(getUserByUsernameFailure(error.message));
  }
};

export const editUserType =
  (userId, newUserType, token) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${userId}/type`,
        { userType: newUserType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(editUserTypeSuccess(response.data));
    } catch (error) {
      dispatch(editUserTypeFailure(error.message));
    }
  };

export default userSlice.reducer;
