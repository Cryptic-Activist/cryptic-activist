import { AxiosResponse } from 'axios';

import { OFFER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';

import { CurrentOffersParams } from './types';

const fetchCurrentOffers = async ({
	type,
	userId,
}: CurrentOffersParams): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${OFFER_API}/offers/user/${userId}?type=${type}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getCurrentOffers = createAsyncThunk(
	'currentOffers/getCurrentOffers',
	async ({ type, userId }: CurrentOffersParams) => {
		try {
			const currentOffers = await fetchCurrentOffers({ type, userId });

			if (!currentOffers) {
				return null;
			}

			return currentOffers.data.results;
		} catch (err) {
			console.log(err);
		}
	}
);
