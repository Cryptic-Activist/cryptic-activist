import { createSlice } from '@reduxjs/toolkit';
import { getEthereumWallet } from '../../thunks/wallet';
import { AppState } from './types';

const initialState: AppState = {
	wallet: {
		address: null,
	},
	fetched: false,
	loading: false,
	errors: [],
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		resetWallet: (state) => {
			state.wallet.address = null;
			state.errors = [];
			state.fetched = false;
			state.loading = false;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(getEthereumWallet.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getEthereumWallet.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could get Ethereum wallet'];
		});
		addCase(getEthereumWallet.fulfilled, (state, action) => {
			state.wallet.address = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const { resetWallet } = appSlice.actions;

export default appSlice.reducer;
