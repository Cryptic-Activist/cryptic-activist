import { createSlice } from '@reduxjs/toolkit';

import { getFeedbacks as getFeedbacksThunk } from '../../thunks/feedbacks';
import { FeedbacksState } from './types';

const initialState: FeedbacksState = {
	data: [],
	fetched: false,
	loading: false,
	errors: [],
};

export const feedbacksSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(getFeedbacksThunk.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getFeedbacksThunk.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch feedbacks information'];
		});
		addCase(getFeedbacksThunk.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const {} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
