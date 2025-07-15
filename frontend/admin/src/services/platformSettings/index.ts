import { fetchGet, fetchPost, fetchPut } from '../axios';

import { BACKEND } from '@/constants';
import { DefaultFields } from '@/hooks/usePlatformSettings/types';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';

export const getPlatformSettings = async () => {
	const accessToken = getLocalStorage('accessToken');
	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/settings`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const updatePlatformPublicSettings = async (
	settings: DefaultFields[]
) => {
	const accessToken = getLocalStorage('accessToken');
	if (!accessToken) {
		return null;
	}

	console.log({ settings });

	const response = await fetchPut(
		`${BACKEND}/settings/public/update`,
		{
			settings
		},
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const updatePlatformPrivateSettings = async (
	settings: DefaultFields[]
) => {
	const accessToken = getLocalStorage('accessToken');
	if (!accessToken) {
		return null;
	}

	const response = await fetchPut(
		`${BACKEND}/settings/private/update`,
		{
			settings
		},
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
