import { FIAT_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';

import { AxiosResponse } from 'axios';

const fetchFiats = async (): Promise<AxiosResponse> => {
	const response = await fetchGet(`${FIAT_API}/fiats`);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getFiats = createAsyncThunk('fiats/getFiats', async () => {
	try {
		const fiats = await fetchFiats();

		if (!fiats) {
			return null;
		}

		return fiats.data.results;
	} catch (err) {}
});
