import { createSlice } from '@reduxjs/toolkit';

export const responsesSlice = createSlice({
  name: 'responses',
  initialState: {
    photoPreviewUrl: null,
    photoUploadResponse: null,
    recommendationsResponse: null,
    scheduleResponse: null,
    updatedRoutine: null
  },
  reducers: {
    setPhotoPreviewUrl: (state, action) => {
      state.photoPreviewUrl = action.payload;
    },
    setPhotoUploadResponse: (state, action) => {
      state.photoUploadResponse = action.payload;
    },
    setRecommendationsResponse: (state, action) => {
      state.recommendationsResponse = action.payload;
    },
    setScheduleResponse: (state, action) => {
      state.scheduleResponse = action.payload;
    },
    setUpdatedRoutine: (state, action) => {
      state.updatedRoutine = action.payload;
    }
  },
});

// Export actions
export const { setPhotoPreviewUrl, setPhotoUploadResponse, setRecommendationsResponse, setScheduleResponse, setUpdatedRoutine } = responsesSlice.actions;

// Export reducer
export default responsesSlice.reducer;
