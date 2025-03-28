import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
	NavigationBarState,
	ResetNavigationBarPayload,
	ToggleDrawerActionPayload,
	ToggleModalActionPayload,
	ToggleTooltipActionPayload,
} from './types';

const initialState: NavigationBarState = {
	drawers: {
		user: false,
	},
	tooltips: {
		user: false,
		wallet: false,
	},
	modals: {
		cryptocurrencies: false,
		fiats: false,
		login: false,
		paymentMethods: false,
		privateKeys: false,
		register: false,
		resetPassword: false,
		blockchain: false,
		verifyAccount: false,
	},
	status: 'idle',
};

export const navigationBarSlice = createSlice({
	name: 'navigationBar',
	initialState,
	reducers: {
		toggleDrawer: (state, action: PayloadAction<ToggleDrawerActionPayload>) => {
			state.drawers[action.payload.drawer] = !state.drawers[action.payload.drawer];
		},
		toggleModal: (state, action: PayloadAction<ToggleModalActionPayload>) => {
			Object.keys(state.modals).forEach((key) => {
				state.modals[key] = false;
			});
			state.modals[action.payload.modal] = !state.modals[action.payload.modal];
		},
		toggleTooltip: (state, action: PayloadAction<ToggleTooltipActionPayload>) => {
			state.tooltips[action.payload.tooltip] =
				!state.tooltips[action.payload.tooltip];
		},
		resetNavigationBar: (
			state,
			action: PayloadAction<ResetNavigationBarPayload>
		) => {
			Object.keys(state[action.payload]).forEach((key) => {
				state[action.payload][key] = false;
			});
		},
	},
});

export const { resetNavigationBar, toggleDrawer, toggleModal, toggleTooltip } =
	navigationBarSlice.actions;

export default navigationBarSlice.reducer;
