import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    resetAuth(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, setUser, resetAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
