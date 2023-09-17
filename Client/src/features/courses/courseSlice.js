import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    removeCourse(state, action) {
      //return new array without the removed course by using filter
      state = state.filter((course) => course.id !== action.payload);
    },
    addCourse(state, action) {
      //add new course to the array
      state.push(action.payload);
    },
    setCourses(state, action) {
      return action.payload;
    },
    resetCourses() {
      return initialState;
    },
  },
});
export const { removeCourse, addCourse, setCourses, resetCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
