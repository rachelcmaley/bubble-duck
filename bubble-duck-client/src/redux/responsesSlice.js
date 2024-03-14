import { createSlice } from '@reduxjs/toolkit';

export const responsesSlice = createSlice({
  name: 'responses',
  initialState: {
    photoUploadResponse: null,
    recommendationsResponse: null,
    scheduleResponse: null,
  },
  reducers: {
    setPhotoUploadResponse: (state, action) => {
      state.photoUploadResponse = action.payload;
    },
    setRecommendationsResponse: (state, action) => {
      state.recommendationsResponse = action.payload;
    },
    setScheduleResponse: (state, action) => {
      state.scheduleResponse = action.payload;
    },
  },
});

// Export actions
export const { setPhotoUploadResponse, setRecommendationsResponse, setScheduleResponse } = responsesSlice.actions;

// Export reducer
export default responsesSlice.reducer;