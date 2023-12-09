/**
 * @module Client/courseSlice
 * @description Redux slice managing the state related to courses.
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * @type {Course}
 * @description The initial state of the course slice.
 */
const initialState = {
  courses: [],
  allCourses: [],
  selectedCourse: {},
};

/**
 * @function courseSlice
 * @description A slice of the Redux store for managing courses.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - Redux reducers for updating the state.
 * @returns {Object} An object containing the reducer and actions.
 */
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    /**
     * @function removeCourse
     * @description Removes a course from the list of courses.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the course ID to be removed.
     */
    removeCourse(state, action) {
      // Use filter to create a new array without the removed course
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    /**
     * @function addCourse
     * @description Adds a new course to the list of courses.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new course data.
     */
    addCourse(state, action) {
      // Push the new course to the array
      state.courses.push(action.payload);
    },
    /**
     * @function setCourses
     * @description Sets the list of courses.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new courses data.
     */
    setCourses(state, action) {
      // Directly assign the payload to courses
      state.courses = action.payload;
    },
    /**
     * @function setAllCourses
     * @description Sets the list of all courses.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the API response with courses.
     */
    setAllCourses(state, action) {
      // action.payload is the entire API response (["Courses found successfully", Array])
      // Extract the courses array (the second element)
      const [, coursesArray] = action.payload;

      // Update the allCourses state with the courses array
      state.allCourses = coursesArray;
    },
    /**
     * @function addLecture
     * @description Adds a lecture to the selected course.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new lecture data.
     */
    addLecture(state, action) {
      state.selectedCourse.lectures.push(action.payload);
    },
    /**
     * @function resetCourses
     * @description Resets the list of courses and the selected course to the initial state.
     * @param {Object} state - The current state.
     */
    resetCourses(state) {
      state.courses = initialState.courses;
      state.selectedCourse = initialState.selectedCourse;
    },
    /**
     * @function selectCourse
     * @description Selects a specific course.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the selected course data.
     */
    selectCourse(state, action) {
      state.selectedCourse = action.payload;
    },
    /*
    updateCourse: (state, action) => {
      const { id, name, description } = action.payload;
      state.courses = state.courses.map((course) =>
        course.id === id ? { ...course, name, description } : course
      );
    },
    */
  },
});

export const {
  removeCourse,
  addCourse,
  setCourses,
  setAllCourses,
  resetCourses,
  selectCourse,
  addLecture,
  updateCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
