import { CHAT_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPost } from '@services/axios';
import { CreateChatParam } from '@store/reducers/chat/types';

import { AxiosResponse } from 'axios';

const fetchNewChat = async (param: CreateChatParam): Promise<AxiosResponse> => {
	console.log(CHAT_API);
	const response = await fetchPost(`${CHAT_API}/chat/create`, param);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const createChat = createAsyncThunk(
	'chat/createChat',
	async (param: CreateChatParam) => {
		try {
			const chat = await fetchNewChat(param);

			if (!chat) {
				return null;
			}

			return chat.data.results;
		} catch (err) {}
	}
);
