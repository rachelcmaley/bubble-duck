import { configureStore } from '@reduxjs/toolkit';
import responsesReducer from './responsesSlice'; 
import quizReducer from './quizSlice'

const store = configureStore({
  reducer: {
    responses: responsesReducer, // Ensure this matches the slice name
    quiz: quizReducer,
  },
});

export default store;
