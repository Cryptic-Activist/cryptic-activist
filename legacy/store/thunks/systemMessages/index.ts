import { AxiosResponse } from 'axios';

import { TRADE_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';
import {
	CreateTradeParam,
	GetTradeParams,
} from '@store/reducers/systemMessages';
import { getAuthToken } from '@utils/localStorage';

const fetchGetSystemMessages = async (
	params: GetTradeParams
): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${TRADE_API}/trade/get/${params.id}`,
		{
			Authorization: getAuthToken(),
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

const fetchCreateSystemMessage = async (
	params: GetTradeParams
): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${TRADE_API}/trade/get/${params.id}`,
		{
			Authorization: getAuthToken(),
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getSystemMessages = createAsyncThunk(
	'systemMessages/getSystemMessages',
	async (param: CreateTradeParam) => {
		try {
			const systemMessages = await fetchGetSystemMessages(param);

			if (!systemMessages) {
				return null;
			}

			return systemMessages.data.results;
		} catch (err) {}
	}
);

export const createSystemMessage = createAsyncThunk(
	'systemMessages/createSystemMessage',
	async (param: CreateTradeParam) => {
		try {
			const systemMessages = await fetchGetSystemMessages(param);

			if (!systemMessages) {
				return null;
			}

			return systemMessages.data.results;
		} catch (err) {}
	}
);
