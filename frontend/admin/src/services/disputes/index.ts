import { Filter, GetDisputesParams } from './types';
import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';
import { getLocalStorage } from '@/utils/browser/storage';
import { getQueries } from '@/utils/axios';

export const getDisputes = async (params: GetDisputesParams) => {
	const queries = getQueries(params);
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/disputes/admin` + queries, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getFilter = async (filter: Filter) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/disputes/filters/${filter}/admin`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
