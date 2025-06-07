import { BACKEND } from '@/constants';
import { GetDisputeParam } from './types';
import { fetchGet } from '../axios';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';

export const getDispute = async (id: string) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(`${BACKEND}/disputes/dispute/${id}/admin`, {
		Authorization: getBearerToken(accessToken)
	});

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};
