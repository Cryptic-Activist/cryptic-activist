import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';
import type { GetTradesParams } from './types';
import { fetchGet } from '../axios';
import { getQueries } from '@/utils/axios';

export const getTrades = async ({
	dateRageEnd,
	dateRageStart,
	...rest
}: GetTradesParams) => {
	const dateStartISO = dateRageStart?.toISOString() ?? '';
	const dateEndISO = dateRageEnd?.toISOString() ?? '';
	const encodedDateStart = encodeURIComponent(dateStartISO);
	const encodedDateEnd = encodeURIComponent(dateEndISO);
	const queries = getQueries({
		dateStart: encodedDateStart,
		dateEnd: encodedDateEnd,
		...rest
	});
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/admin` + queries, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
