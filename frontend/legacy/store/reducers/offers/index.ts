import { createSlice } from '@reduxjs/toolkit';

import { getOffersPagination } from '../../thunks/offers';
import { OfferState } from './types';

const initialState: OfferState = {
	// @ts-ignore
	data: [],
	buy: [],
	sell: [],
	fetched: false,
	loading: false,
	errors: [],
};

export const offersSlice = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		getBuyOffers: (state) => {
			const filteredBuy = state.data?.filter(
				(buy) => buy.paymentMethodType === 'buy'
			);

			state.buy = filteredBuy;
		},
		getSellOffers: (state) => {
			const filteredBuy = state.data?.filter(
				(sell) => sell.paymentMethodType === 'sell'
			);

			state.sell = filteredBuy;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(getOffersPagination.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getOffersPagination.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch user information'];
		});
		addCase(getOffersPagination.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const { getBuyOffers, getSellOffers } = offersSlice.actions;

export default offersSlice.reducer;
