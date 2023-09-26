import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  selectedCourse: {},
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    removeCourse(state, action) {
      // Use filter to create a new array without the removed course
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    addCourse(state, action) {
      // Push the new course to the array
      state.courses.push(action.payload);
    },
    setCourses(state, action) {
      // Directly assign the payload to courses
      state.courses = action.payload;
    },
    resetCourses(state) {
      // Reset the state to the initial state
      state.courses = initialState.courses;
      state.selectedCourse = initialState.selectedCourse;
    },
    selectCourse(state, action) {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  removeCourse,
  addCourse,
  setCourses,
  resetCourses,
  selectCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
