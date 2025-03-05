import { USER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet, fetchPost } from '@services/axios';
import {
	getLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from '@utils/browser';
import { AxiosResponse } from 'axios';

import { GetTokensReturn, GetUserInfoReturn, LoginUserParams } from './types';

const getToken = async (
	userData: LoginUserParams
): Promise<AxiosResponse<GetTokensReturn>> => {
	const response = await fetchPost(
		`${USER_API}/users/auth/login`,
		userData
	);


	if (response.status !== 200) {
		return null;
	}

	return response;
};

const getUserInfoFromToken = async (
	token: string
): Promise<AxiosResponse<GetUserInfoReturn>> => {
	const response = await fetchGet(
		`${USER_API}/users/auth/login/decode/token/${token}`,
		{ Authorization: `Bearer ${token}` }
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const loginUser = createAsyncThunk(
	'user/login',
	async (userData: LoginUserParams) => {
		try {
			const tokens = await getToken(userData);

			if (!tokens) {
				return null;
			}

			setLocalStorage('accessToken', tokens.data.results.accessToken);
			setLocalStorage('refreshToken', tokens.data.results.refreshToken);

			const userInfo = await getUserInfoFromToken(tokens.data.results.accessToken);

			if (!userInfo) {
				removeLocalStorage('accessToken');
				removeLocalStorage('refreshToken');
				return null;
			}

			return userInfo.data.results;
		} catch (err) {
			removeLocalStorage('accessToken');
			removeLocalStorage('refreshToken');

			return {
				errors: err.response.data.errors
			}
		}
	}
);

export const decodeAccessToken = createAsyncThunk(
	'user/decodeAccessToken',
	async () => {
		try {
			const accessToken = getLocalStorage('accessToken');

			if (!accessToken) {
				return null;
			}

			const userInfo = await getUserInfoFromToken(accessToken);

			if (!userInfo) {
				removeLocalStorage('accessToken');
				removeLocalStorage('refreshToken');
				return null;
			}

			return userInfo.data.results;
		} catch (err) {
			removeLocalStorage('accessToken');
			removeLocalStorage('refreshToken');
		}
	}
);
