import { fetchGet, fetchPost, fetchPut } from '../axios';
import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';
import { DefaultFields } from '@/hooks/usePlatformSettings/types';

export const getPlatformSettings = async () => {
	const accessToken = getCookie('accessToken');
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
	const accessToken = getCookie('accessToken');
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
	const accessToken = getCookie('accessToken');
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
