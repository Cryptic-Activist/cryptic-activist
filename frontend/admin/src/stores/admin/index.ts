import { BACKEND } from '@/constants/envs';
import { fetchGet, fetchPost } from '@/services/axios';
import {
	getCookie,
	removeCookie,
	setCookie
} from '@/utils/browser/cookies';
import { map } from 'nanostores';
import {
	type Admin,
	type AdminState,
	type GetAdminInfoReturn,
	type GetTokensReturn,
	type LoginAdminParams,
	type RegisterAdminParams
} from './types';

export const admin = map<AdminState>({
	loading: false,
	fetched: false,
	errors: []
});

const setter = (
	loading: boolean,
	fetched: boolean,
	errors: string[],
	data?: Admin
) => {
	admin.set({
		data,
		loading,
		fetched,
		errors
	});
};

const reset = () => {
	setter(false, false, [], undefined);
};

const getToken = async (
	adminData: LoginAdminParams
): Promise<GetTokensReturn | null> => {
	const response = await fetchPost(`${BACKEND}/admins/auth/login`, adminData);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const getAdminInfoFromToken = async (
	token: string
): Promise<GetAdminInfoReturn | null> => {
	const response = await fetchGet(
		`${BACKEND}/admins/auth/login/decode/token/${token}`,
		{ Authorization: `Bearer ${token}` }
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const loginAdmin = async (adminData: LoginAdminParams) => {
	try {
		const tokens = await getToken(adminData);

		if (tokens == null) {
			return null;
		}

		if (getCookie('accessToken') !== undefined) {
			removeCookie('accessToken');
		}

		setCookie('accessToken', tokens.accessToken, 1);
		setCookie('refreshToken', tokens.refreshToken, 7);

		const adminInfo = await getAdminInfoFromToken(tokens.accessToken);

		if (adminInfo == null) {
			return null;
		}

		return adminInfo;
	} catch (err) {}
};

export const decodeAccessToken = async () => {
	try {
		const accessToken = getCookie('accessToken');

		if (!accessToken) {
			return null;
		}

		const adminInfo = await getAdminInfoFromToken(accessToken);

		if (adminInfo == null) {
			return null;
		}

		setter(false, true, [], adminInfo);

		return adminInfo;
	} catch (err) {}
};

const registerAdmin = async (
	admin: RegisterAdminParams
): Promise<GetAdminInfoReturn | null> => {
	const response = await fetchPost(`${BACKEND}/admins/auth/register`, admin);

	if (response.status !== 201) {
		return null;
	}

	return response.data;
};

export const handleLoginAdmin = async (dataParams: LoginAdminParams) => {
	setter(true, false, []);
	const loggedIn = await loginAdmin(dataParams);

	if (!loggedIn) {
		setter(false, true, []);
		return false;
	}

	setter(false, true, [], loggedIn);
	return true;
};

export const handleRegisterAdmin = async (admin: RegisterAdminParams) => {
	const registered = await registerAdmin(admin);

	if (registered == null) {
		return false;
	}

	return true;
};

export const logout = () => {
	removeCookie('accessToken');
	removeCookie('refreshToken');

	reset();
};
