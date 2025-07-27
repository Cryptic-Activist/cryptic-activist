import { AdminSetPasswordParams, AdminSetPasswordRequestParams } from './types';
import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants';

export const validatePasswordSetToken = async (token: string) => {
	const response = await fetchGet(
		BACKEND + '/admins/auth/password/set/verify/' + token
	);

	if (response.status !== 200) {
		return response.data.errors;
	}

	return response.data;
};

export const onSubmitAdminSetPassword = async ({
	token,
	...params
}: AdminSetPasswordParams) => {
	const response = await fetchPost(
		BACKEND + '/admins/auth/password/set/' + token,
		{
			...params
		}
	);

	if (response.status !== 200) {
		return false;
	}

	return response.data;
};
