import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    answers: {}
  },
  reducers: {
    updateQuizAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    }
  }
});

export const { updateQuizAnswer } = quizSlice.actions;
export default quizSlice.reducer;
