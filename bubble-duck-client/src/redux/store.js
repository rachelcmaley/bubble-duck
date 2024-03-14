import { configureStore } from '@reduxjs/toolkit';
import responsesReducer from './responsesSlice'; 

const store = configureStore({
  reducer: {
    responses: responsesReducer, // Ensure this matches the slice name
  },
});

export default store;
