import { createSlice } from '@reduxjs/toolkit';

import { getVendor as getVendorThunk } from '../../thunks/vendor';
import { VendorState } from './types';

const initialState: VendorState = {
	// @ts-ignore
	data: {},
	fetched: false,
	loading: false,
	errors: [],
};

export const vendorSlice = createSlice({
	name: 'vendor',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(getVendorThunk.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(getVendorThunk.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch user information'];
		});
		addCase(getVendorThunk.fulfilled, (state, action) => {
			const data = {
				id: action.payload.id,
				names: {
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
				},
				username: action.payload.username,
				profileColor: action.payload.profileColor,
				createdAt: action.payload.createdAt,
				updatedAt: action.payload.updatedAt,
				languages: action.payload.languages,
				blocked: action.payload.blocked,
				blockers: action.payload.blockers,
				trusted: action.payload.trusted,
				tradesCount: action.payload.tradesCount,
			};
			// @ts-ignore
			state.data = data;
			state.fetched = true;
			state.loading = false;
			state.errors = [];
		});
	},
});

export const {} = vendorSlice.actions;

export default vendorSlice.reducer;
