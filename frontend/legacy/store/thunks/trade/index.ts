import { TRADE_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet, fetchPost } from '@services/axios';
import { CreateTradeParam, GetTradeParams } from '@store/reducers/trade/types';
import { getAuthToken } from '@utils/localStorage';

import { AxiosResponse } from 'axios';

const fetchNewTrade = async (
	param: CreateTradeParam
): Promise<AxiosResponse> => {
	const response = await fetchPost(`${TRADE_API}/trade/create`, param, {
		Authorization: getAuthToken(),
	});

	if (response.status !== 200) {
		return null;
	}

	return response;
};

const fetchGetTrade = async (
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

export const createTrade = createAsyncThunk(
	'trade/createTrade',
	async (param: CreateTradeParam) => {
		try {
			const trade = await fetchNewTrade(param);

			if (!trade) {
				return null;
			}

			return trade.data.results;
		} catch (err) {}
	}
);

export const getTrade = createAsyncThunk(
	'trade/getTrade',
	async (params: GetTradeParams) => {
		try {
			const trade = await fetchGetTrade(params);

			if (!trade) {
				return null;
			}

			return trade.data.results;
		} catch (err) {}
	}
);
