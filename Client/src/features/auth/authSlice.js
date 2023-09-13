import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuth(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    resetAuth(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setToken, setUser, resetAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
