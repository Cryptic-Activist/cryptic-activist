import { BACKEND } from '@/constants';
import { GetTradesParams } from './types';
import { fetchGet } from '../axios';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';
import { getQueries } from '@/utils/axios';

export const getTrades = async (params: GetTradesParams) => {
	const queries = getQueries(params);
	const accessToken = getLocalStorage('accessToken');

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
