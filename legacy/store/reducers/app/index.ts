import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
	getDefaultCryptocurrency,
	getDefaultFiat,
	getPrice,
} from '@store/thunks/app';
import {
	AppBlockchainType,
	AppCryptocurrencyType,
	AppDimensionType,
	AppFiatType,
	AppPaymentMethodType,
	AppState,
	AppThemeType,
	AppTypeType,
	AppWarningType,
} from './types';

const initialState: AppState = {
	isMobile: false,
	dimensions: [0, 0],
	warnings: [],
	type: 'buy',
	theme: 'light',
	defaults: {
		fiat: null,
		cryptocurrency: null,
		paymentMethod: null,
	},
	blockchain: null,
	currentPrice: {
		data: null,
		loading: false,
		fetched: false,
		errors: [],
	},
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},
		setDimension: (state, action: PayloadAction<AppDimensionType>) => {
			state.dimensions = action.payload;
		},
		setWarnings: (state, action: PayloadAction<AppWarningType>) => {
			state.warnings = action.payload;
		},
		resetWarnings: (state) => {
			state.warnings = [];
		},
		setType: (state, action: PayloadAction<AppTypeType>) => {
			state.type = action.payload;
		},
		setTheme: (state, action: PayloadAction<AppThemeType>) => {
			state.theme = action.payload;
		},
		setDefaultFiat: (state, action: PayloadAction<AppFiatType>) => {
			state.defaults.fiat = action.payload;
		},
		setDefaultCryptocurrency: (
			state,
			action: PayloadAction<AppCryptocurrencyType>
		) => {
			state.defaults.cryptocurrency = action.payload;
		},
		setDefaultPaymentMethod: (
			state,
			action: PayloadAction<AppPaymentMethodType>
		) => {
			state.defaults.paymentMethod = action.payload;
		},
		setDefaultBlockchain: (state, action: PayloadAction<AppBlockchainType>) => {
			state.blockchain = action.payload;
		},
		setDefaults: (state) => {
			state.defaults = { cryptocurrency: null, fiat: null, paymentMethod: null };
		},
		setBlockchain: (state) => {
			state.blockchain = null;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(getPrice.pending, (state) => {
			state.currentPrice.loading = true;
			state.currentPrice.errors = [];
		});
		addCase(getPrice.rejected, (state) => {
			state.currentPrice.loading = false;
			state.currentPrice.errors = ['Could not fetch price'];
		});
		addCase(getPrice.fulfilled, (state, action: PayloadAction<number>) => {
			state.currentPrice.data = action.payload;
			state.currentPrice.loading = false;
			state.currentPrice.errors = [];
			state.currentPrice.fetched = true;
		});
		addCase(
			getDefaultFiat.fulfilled,
			(state, action: PayloadAction<AppFiatType>) => {
				state.defaults.fiat = action.payload;
			}
		);
		addCase(
			getDefaultCryptocurrency.fulfilled,
			(state, action: PayloadAction<AppCryptocurrencyType>) => {
				state.defaults.cryptocurrency = action.payload;
			}
		);
	},
});

export const {
	resetWarnings,
	setBlockchain,
	setDefaultBlockchain,
	setDefaultCryptocurrency,
	setDefaultFiat,
	setDefaultPaymentMethod,
	setDefaults,
	setDimension,
	setIsMobile,
	setTheme,
	setType,
	setWarnings,
} = appSlice.actions;

export default appSlice.reducer;
