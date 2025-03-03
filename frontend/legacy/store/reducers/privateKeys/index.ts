import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AppState, PrivateKeysPayload } from './types';

const initialState: AppState = {
	privateKeys: [],
};

export const appSlice = createSlice({
	name: 'privateKeys',
	initialState,
	reducers: {
		setPrivateKeys: (state, action: PayloadAction<PrivateKeysPayload>) => {
			state.privateKeys = action.payload.privateKeys;
		},
		resetPrivateKeys: (state) => {
			state.privateKeys = [];
		},
	},
});

export const { resetPrivateKeys, setPrivateKeys } = appSlice.actions;

export default appSlice.reducer;
