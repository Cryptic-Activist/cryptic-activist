import { BACKEND } from '@/constants/envs';
import { fetchGet, fetchPost } from '@/services/axios';
import { getCookie, removeCookie, setCookie } from '@/utils/browser/cookies';
import { map } from 'nanostores';
import type {
	Admin,
	AdminState,
	GetAdminInfoReturn,
	GetTokensReturn,
	LoginAdminParams,
	RegisterAdminParams
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

import api from '@/services/api';

export const setAdmin = (data: Admin) => {
	setter(false, true, [], data);
};

const getToken = async (
	adminData: LoginAdminParams
): Promise<GetTokensReturn | null> => {
	const response = await api.post('/admins/auth/login', adminData);
	return response.data;
};

const getAdminInfoFromToken = async (token: string): Promise<Admin | null> => {
	const response = await api.get(`/admins/auth/login/decode/token/${token}`);
	return response.data;
};

const loginAdmin = async (adminData: LoginAdminParams) => {
	try {
		const tokens = await getToken(adminData);

		if (!tokens) {
			return false;
		}

		setCookie({
			name: 'accessToken',
			value: tokens.accessToken,
			expiresInHours: 1
		});
		setCookie({
			name: 'refreshToken',
			value: tokens.refreshToken,
			expiresInHours: 7
		});

		const adminInfo = await getAdminInfoFromToken(tokens.accessToken);

		if (!adminInfo) {
			removeCookie('accessToken');
			removeCookie('refreshToken');
			return false;
		}

		setter(false, true, [], {
			id: adminInfo.id,
			roles: adminInfo.roles,
			createdAt: adminInfo.createdAt,
			firstName: adminInfo.firstName,
			lastName: adminInfo.lastName,
			updatedAt: adminInfo.updatedAt,
			username: adminInfo.username
		});

		return true;
	} catch (error) {
		removeCookie('accessToken');
		removeCookie('refreshToken');
		return false;
	}
};

export const decodeAccessToken = async () => {
	const accessToken = getCookie('accessToken');

	if (!accessToken) return null;

	try {
		const adminInfo = await getAdminInfoFromToken(accessToken);
		return adminInfo;
	} catch (error) {
		removeCookie('accessToken');
		removeCookie('refreshToken');
		return null;
	}
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

	// setter(false, true, [], loggedIn);
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
