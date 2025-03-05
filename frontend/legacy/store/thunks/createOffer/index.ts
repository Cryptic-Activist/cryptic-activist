import { OFFER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPost } from '@services/axios';
import { getLocalStorage } from '@utils/browser';

import { AxiosResponse } from 'axios';
import type { CreateOfferParams } from './types';

const submitOffer = async (data: CreateOfferParams): Promise<AxiosResponse> => {
	const accessToken = getLocalStorage('accessToken');
	const headers = {
		Authorization: `Bearer ${accessToken}`,
	};
	const response = await fetchPost(
		`${OFFER_API}/offer/create`,
		data,
		headers
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const createOffer = createAsyncThunk(
	'createOffer/submit',
	async (data: CreateOfferParams) => {
		try {
			const newOffer = await submitOffer(data);

			if (!newOffer) {
				return null;
			}

			const hasCreated = Object.entries(newOffer.data.results).length > 0;

			return hasCreated;
		} catch (err) {
			return null;
		}
	}
);
