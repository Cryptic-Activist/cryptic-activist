import { Filter, GetKYCsParams } from './types';

import { BACKEND } from '@/constants';
import { fetchGet } from '../axios';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';
import { getQueries } from '@/utils/axios';

export const getKYCs = async (params: GetKYCsParams) => {
	const queries = getQueries(params);
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/users/kyc/applications/admin` + queries,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getFilter = async (filter: Filter) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/users/kyc/filters/${filter}/admin`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getTotalPendingKYC = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/users/kyc/pending/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalApprovedKYC = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/users/kyc/approved/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalRejectedKYC = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/users/kyc/rejected/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};

export const getTotalKYCApplications = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/users/kyc/applications/total`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) return null;

	return response.data;
};
