import { createSlice } from '@reduxjs/toolkit';

import { CryptocurrenciesState } from './types';
import { getCryptocurrencies } from '../../thunks/cryptocurrencies';

const initialState: CryptocurrenciesState = {
	data: [],
	fetched: false,
	loading: false,
	errors: [],
};

export const cryptocurrenciesSlice = createSlice({
	name: 'cryptocurrencies',
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
