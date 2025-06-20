import { ApproveKYCParams, GetKYCParams, RejectKYCParams } from './types';
import { fetchGet, fetchPost } from '../axios';

import { BACKEND } from '@/constants';
import { getBearerToken } from '@/utils';
import { getLocalStorage } from '@/utils/browser/storage';

export const getKYC = async (params: GetKYCParams) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		`${BACKEND}/users/kyc/${params.kycId}/details/${params.adminId}/details`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

export const approveKYC = async (params: ApproveKYCParams) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/users/kyc/${params.kycId}/approve`,
		{
			adminId: params.adminId
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

export const rejectKYC = async (params: RejectKYCParams) => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/users/kyc/${params.kycId}/reject`,
		{
			adminId: params.adminId,
			rejectionReason: params.rejectionReason
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
