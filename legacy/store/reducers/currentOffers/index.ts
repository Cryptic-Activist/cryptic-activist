import { createSlice } from '@reduxjs/toolkit';

import { getCurrentOffers as getCurrentOffersThunk } from '../../thunks/currentOffers';
import { CurrentOffersState } from './types';

const initialState: CurrentOffersState = {
	data: [],
	buy: [],
	sell: [],
	fetched: false,
	loading: false,
	errors: [],
};

export const currentOffersSlice = createSlice({
	name: 'currentOffers',
	initialState,
	reducers: {
		getBuyCurrentOffers: (state) => {
			const filteredBuy = state.data.filter(
				(buy) => buy.paymentMethodType === 'buy'
			);

			state.buy = filteredBuy;
		},
		getSellCurrentOffers: (state) => {
			const filteredBuy = state.data.filter(
				(sell) => sell.paymentMethodType === 'sell'
			);

			state.sell = filteredBuy;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(getCurrentOffersThunk.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getCurrentOffersThunk.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch current offers information'];
		});
		addCase(getCurrentOffersThunk.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const { getBuyCurrentOffers, getSellCurrentOffers } =
	currentOffersSlice.actions;

export default currentOffersSlice.reducer;
