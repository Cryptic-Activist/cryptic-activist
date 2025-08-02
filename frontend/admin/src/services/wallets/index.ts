import { fetchDelete, fetchGet, fetchPost } from '../axios';
import { getBearerToken, getCookie } from '@/utils';

import { BACKEND } from '@/constants';

export const getUsersWallets = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		BACKEND + '/blockchains/wallet/users/wallets',
		{
			Authorization: getBearerToken(accessToken)
		}
	);
	return response.data;
};

export const getAdminWallets = async (adminId: string) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(
		BACKEND + `/blockchains/wallet/admin/${adminId}/arbitrator/wallets`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);
	return response.data;
};

export const softDeleteAdminWallet = async (walletId: string) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchDelete(
		BACKEND + `/blockchains/wallet/admin/wallets/${walletId}`,
		{
			Authorization: getBearerToken(accessToken)
		}
	);
	return response.data;
};

export const createAdminWallet = async (
	adminId: string,
	walletAddress: string
) => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		BACKEND + `/blockchains/wallet/admin/wallets`,
		{ adminId, walletAddress },
		{
			Authorization: getBearerToken(accessToken)
		}
	);
	return response.data;
};

export const getSuperAdmins = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchGet(BACKEND + '/admins/super-admins', {
		Authorization: getBearerToken(accessToken)
	});
	return response.data;
};
