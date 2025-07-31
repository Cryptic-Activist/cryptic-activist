import { fetchGet, fetchPost } from '../axios';
import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';
import { CreateBannerParams } from './types';

export const createBanner = async (params: CreateBannerParams) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const { startDate, endDate, ...rest } = params;

	const isoStartDate = new Date(startDate).toISOString();
	const isoEndDate = endDate ? new Date(endDate).toISOString() : undefined;

	const response = await fetchPost(
		`${BACKEND}/banners`,
		{
			...rest,
			startDate: isoStartDate,
			...(isoEndDate && { endDate: isoEndDate })
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

export const getBanners = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/banners`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const getBanner = async (id: string) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/banners/${id}`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
