import { createSlice } from '@reduxjs/toolkit';
import { createChat } from '@store/thunks/chat';

import { ChatState } from './types';

const initialState: ChatState = {
	loading: false,
	fetched: false,
	errors: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(createChat.pending, (state, action) => {
			state.loading = true;
			state.errors = [];
		});
		addCase(createChat.rejected, (state, action) => {
			state.loading = false;
			state.errors = ['Could not fetch new chat'];
		});
		addCase(createChat.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.errors = [];
			state.fetched = true;
		});
	},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
