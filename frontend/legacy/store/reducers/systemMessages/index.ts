import { createSlice } from '@reduxjs/toolkit';
import { createTrade } from '@store/thunks/trade';

import { SystemMessagesState } from './types';

const initialState: SystemMessagesState = {
	data: [],
	loading: false,
	fetched: false,
	errors: [],
};

export const systemMessagesSlice = createSlice({
	name: 'systemMessages',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(createTrade.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(createTrade.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch new trade'];
		});
		addCase(createTrade.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const {} = systemMessagesSlice.actions;

export default systemMessagesSlice.reducer;
