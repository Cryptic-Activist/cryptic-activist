import { createSlice } from '@reduxjs/toolkit';
import { createTrade, getTrade } from '@store/thunks/trade';

import { TradeState } from './types';

const initialState: TradeState = {
	loading: false,
	fetched: false,
	errors: [],
};

export const tradeSlice = createSlice({
	name: 'trade',
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
		addCase(getTrade.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getTrade.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch trade'];
		});
		addCase(getTrade.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const {} = tradeSlice.actions;

export default tradeSlice.reducer;
