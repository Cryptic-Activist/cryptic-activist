import { createSlice } from '@reduxjs/toolkit';

import { getCryptocurrencies } from '../../thunks/cryptocurrencies';
import { ProfileState } from './types';

const initialState: ProfileState = {
	data: {
		blocks: [],
		feedbacks: [],
		trusts: [],
	},
	fetched: false,
	loading: false,
	errors: [],
};

export const cryptocurrenciesSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		getCryptocurrency: (state) => {},
	},
	extraReducers: ({ addCase }) => {
		addCase(getCryptocurrencies.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getCryptocurrencies.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch cryptocurrencies'];
		});
		addCase(getCryptocurrencies.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const { getCryptocurrency } = cryptocurrenciesSlice.actions;

export default cryptocurrenciesSlice.reducer;
