import { CRYPTOCURRENCY_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';

import { AxiosResponse } from 'axios';

const fetchCryptocurrencies = async (): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${CRYPTOCURRENCY_API}/cryptocurrencies`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getCryptocurrencies = createAsyncThunk(
	'cryptocurrencies/getCryptocurrencies',
	async () => {
		try {
			const cryptocurrencies = await fetchCryptocurrencies();

			if (!cryptocurrencies) {
				return null;
			}

			return cryptocurrencies.data.results;
		} catch (err) {}
	}
);
