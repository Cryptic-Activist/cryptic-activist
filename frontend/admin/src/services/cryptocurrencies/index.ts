import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';

export const getCryptocurenciesFilters = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/cryptocurrencies/filters`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
