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
  },
});

export const {
  editUserSuccess,
  editUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
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

export default userSlice.reducer;
