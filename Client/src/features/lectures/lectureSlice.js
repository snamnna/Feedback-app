import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectures: [],
  selectedLecture: null,
};

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    removeLecture(state, action) {
      //return new array without the removed lecture by using filter
      state.lectures = state.lectures.filter(
        (lecture) => lecture.id !== action.payload
      );
    },
    setSelectedLecture(state, action) {
      state.selectedLecture = action.payload;
    },
    addLecture(state, action) {
      //add new lecture to the array
      state.lectures.push(action.payload);
    },
    setLectures(state, action) {
      state.lectures = action.payload;
    },
    resetLectures(state) {
      state.lectures = [];
    },
  },
});

export const {
  removeLecture,
  addLecture,
  setSelectedLecture,
  setLectures,
  resetLectures,
} = lectureSlice.actions;
export default lectureSlice.reducer;
