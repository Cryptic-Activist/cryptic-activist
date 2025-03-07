import type { CreateUserParams, UsersState } from './types';
import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants/envs';
import { map } from 'nanostores';

export const users = map<UsersState>({
	data: [],
	loading: false,
	fetched: false,
	errors: []
});

const fetchCreateUser = async (data: CreateUserParams) => {
	const response = await fetchPost(`${BACKEND}/users/auth/register`, data);

	if (response.status !== 200) {
		return null;
	}

	return response.data.results;
};

const fetchListUsers = async () => {
	const response = await fetchGet(`${BACKEND}/users/all`);

	if (response.status !== 200) {
		return null;
	}

	return response.data.results;
};

const setter = (
	data: any[],
	loading: boolean,
	fetched: boolean,
	errors: string[]
) => {
	users.set({
		data,
		loading,
		fetched,
		errors
	});
};

export const createUser = async (dataParams: CreateUserParams) => {
	setter([], true, false, []);
	const created = await fetchCreateUser(dataParams);

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter([], false, true, []);
};

export const listUsers = async () => {
	setter([], true, false, []);
	const list = await fetchListUsers();

	if (!list) {
		setter([], false, true, []);
		return null;
	}

	setter(list, false, true, []);
};
