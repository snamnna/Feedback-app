import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lectures: [],
  selectedLecture: {},
};

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    removeLecture(state, action) {
      //return new array without the removed lecture by using filter
      state = state.filter((lecture) => lecture.id !== action.payload);
    },
    addLecture(state, action) {
      //add new lecture to the array
      state.push(action.payload);
    },
    setLectures(state, action) {
      return action.payload;
    },
    resetLectures() {
      return initialState;
    },
    selectLecture(state, action) {
      state.selectedLecture = action.payload;
    },
  },
});

export const {
  removeLecture,
  addLecture,
  selectLecture,
  setLectures,
  resetLectures,
} = lectureSlice.actions;
export default lectureSlice.reducer;
