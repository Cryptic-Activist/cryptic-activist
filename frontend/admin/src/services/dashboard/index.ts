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
