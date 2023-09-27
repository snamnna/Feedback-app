import { createSlice } from "@reduxjs/toolkit";
import { editUser } from "../../services/userServices";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {
    updateUser: async (state, action) => {
      try {
        state.status = "loading";
        const response = await editUser(action.payload);
        state.data = response;
        state.status = "succeeded";
      } catch (error) {
        state.status = "failed";
        state.error = error.message;
      }
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
