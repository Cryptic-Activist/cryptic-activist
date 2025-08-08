import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants/envs';
import type { GetRecentTradesParams } from './types';
import { fetchGet } from '../axios';
import { getQueries } from '@/utils/axios';

export const getRecentTrades = async (params: GetRecentTradesParams) => {
	const queries = getQueries(params);

	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/recent` + queries, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalUsers = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/users/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalActiveOffers = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/offers/active`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalTrades = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalActiveTrades = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/active/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalCompletedTradesToday = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/completed/today/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalDisputedTrades = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/disputed/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getAverageTradeCompletionTime = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/average/completion`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalCompletedTrades = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/completed/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalTradeVolume = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/volume`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};
