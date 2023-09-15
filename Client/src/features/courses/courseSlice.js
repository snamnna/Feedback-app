import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    removeCourse(state, action) {
      //return new array without the removed course by using filter
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    addCourse(state, action) {
      //add new course to the array
      state.courses.push(action.payload);
    },
    setCourses(state, action) {
      //gets all the items from the array and sets them in the payload
      state.courses = action.payload;
    },
    resetCourses(state) {
      state.courses = [];
    },
  },
});
export const { removeCourse, addCourse, setCourses, resetCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
