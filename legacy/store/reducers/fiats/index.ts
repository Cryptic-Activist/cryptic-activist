import { createSlice } from '@reduxjs/toolkit';

import { FiatsState } from './types';
import { getFiats } from '../../thunks/fiats';

const initialState: FiatsState = {
	data: [],
	fetched: false,
	loading: false,
	errors: [],
};

export const fiatsSlice = createSlice({
	name: 'fiats',
	initialState,
	reducers: {
		getCryptocurrency: (state) => {},
	},
	extraReducers: ({ addCase }) => {
		addCase(getFiats.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getFiats.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch cryptocurrencies'];
		});
		addCase(getFiats.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const { getCryptocurrency } = fiatsSlice.actions;

export default fiatsSlice.reducer;
