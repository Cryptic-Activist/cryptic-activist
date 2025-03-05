import { OFFER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';
import { getQueries } from '@utils/axios';

import { GetOffersReturn, OffersParams } from './types';

const fetchOffersPagination = async (
	params: OffersParams
): Promise<GetOffersReturn> => {
	const query = getQueries({ ...params });
	const response = await fetchGet(
		`${OFFER_API}/offers/pagination${query}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data.results;
};

export const getOffersPagination = createAsyncThunk(
	'offers/getOffers',
	async (offersParams: OffersParams) => {
		try {
			const offers = await fetchOffersPagination(offersParams);

			return offers;
		} catch (err) {}
	}
);
