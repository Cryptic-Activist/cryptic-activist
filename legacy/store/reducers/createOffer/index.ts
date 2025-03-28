import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { createOffer } from '@store/thunks/createOffer';

import {
	CreateOfferPayload,
	CreateOfferState,
	SectionParams,
	ToggleSectionParams,
} from './types';

const initialState: CreateOfferState = {
	data: {
		section: {
			paymentMethod: true,
			tradePricing: false,
			tradeInstructions: false,
		},
		cryptocurrency: null,
		fiat: null,
		paymentMethodType: 'sell',
		category: null,
		selection: null,
		isPaymentMethodCompleted: false,
		tradePricingType: 'market',
		listAt: 0,
		limitMin: 10,
		limitMax: 10000,
		timeLimit: 10,
		isTradePricingCompleted: false,
		tags: [],
		label: '',
		terms: '',
		instructions: '',
		isTradeInstructionsCompleted: false,
		isFilled: false,
		isSubmitted: false,
	},
	loading: false,
	fetched: false,
	hasCreated: false,
	errors: [],
};

export const createOfferSlice = createSlice({
	name: 'createOffer',
	initialState,
	reducers: {
		reset: (state) => {
			state.data = initialState.data;
			state.errors = initialState.errors;
			state.fetched = initialState.fetched;
			state.hasCreated = initialState.hasCreated;
			state.loading = initialState.loading;
		},
		toggleSection: (state, action: PayloadAction<ToggleSectionParams>) => {
			state.data.section.paymentMethod = false;
			state.data.section.tradeInstructions = false;
			state.data.section.tradePricing = false;
			state.data.section[action.payload] = true;
		},
		setValue: (state, action: PayloadAction<CreateOfferPayload>) => {
			const key = Object.keys(action.payload)[0];
			state.data[key] = action.payload[key];
		},
		checkSectionCompleted: (state, action: PayloadAction<SectionParams>) => {
			let isCompleted = false;

			switch (action.payload) {
				case 'paymentMethod':
					isCompleted =
						state.data.paymentMethodType &&
						state.data.paymentMethodType.length > 0 &&
						state.data.cryptocurrency &&
						state.data.fiat &&
						state.data.category &&
						state.data.category.length > 0 &&
						state.data.selection.length > 0;

					state.data.isPaymentMethodCompleted = isCompleted;
					break;
				case 'tradeInstructions':
					isCompleted =
						(state.data.tradePricingType === 'fixed' ||
							state.data.tradePricingType === 'market') &&
						state.data.listAt > 0 &&
						state.data.limitMin > 0 &&
						state.data.limitMax > 0 &&
						state.data.timeLimit > 0;

					state.data.isTradePricingCompleted = isCompleted;
					break;
				case 'tradePricing':
					isCompleted =
						state.data.tags.length > 0 &&
						state.data.label.length > 0 &&
						state.data.terms.length > 0 &&
						state.data.instructions.length > 0;

					state.data.isTradeInstructionsCompleted = isCompleted;
					break;
			}
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(createOffer.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(createOffer.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not create offer'];
		});
		addCase(createOffer.fulfilled, (state, action: PayloadAction<boolean>) => {
			state.loading = false;
			state.errors = [];
			state.fetched = true;

			if (action.payload) {
				state.hasCreated = true;
			}
		});
	},
});

export const { toggleSection, setValue, checkSectionCompleted, reset } =
	createOfferSlice.actions;

export default createOfferSlice.reducer;
