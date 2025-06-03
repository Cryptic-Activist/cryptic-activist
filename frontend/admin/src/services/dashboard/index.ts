import { BACKEND } from '@/constants/envs';
import { fetchGet } from '../axios';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';

export const getRecentTrades = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/recent`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalUsers = async () => {
	const accessToken = getLocalStorage('accessToken');

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
	const accessToken = getLocalStorage('accessToken');

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
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalCompletedTrades = async () => {
	const accessToken = getLocalStorage('accessToken');

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
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/trades/volume`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};
