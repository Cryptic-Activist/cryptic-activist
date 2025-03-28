import { createSlice } from '@reduxjs/toolkit';

import { removeLocalStorage } from '@utils/browser';
import {
	decodeAccessToken,
	loginUser as loginUserThunk,
} from '../../thunks/user';
import { UserState } from './types';

const initialState: UserState = {
	// @ts-ignore
	data: {},
	fetched: false,
	loading: false,
	errors: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			// @ts-ignore
			state.data = {};
			state.errors = [];
			state.fetched = false;
			state.loading = false;
			removeLocalStorage('accessToken');
			removeLocalStorage('refreshToken');
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(loginUserThunk.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(loginUserThunk.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch user information'];
		});
		addCase(loginUserThunk.fulfilled, (state, action) => {
			if (action.payload.errors) {
				state.errors = action.payload.errors;
				return;
			}
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
			};
			// @ts-ignore
			state.data = data;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
		addCase(decodeAccessToken.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(decodeAccessToken.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch user information'];
		});
		addCase(decodeAccessToken.fulfilled, (state, action) => {
			if (action.payload) {
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
				};
				// @ts-ignore
				state.data = data;
				state.loading = false;
				state.errors = [];
				state.fetched = true;
			} else {
				state.loading = false;
				state.errors = [];
				state.fetched = false;
			}
		});
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
