import type { CreateFiatParams, FiatsState } from './types';
import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants/envs';
import { map } from 'nanostores';

export const fiats = map<FiatsState>({
	data: [],
	loading: false,
	fetched: false,
	errors: []
});

const fetchCreateFiat = async (data: CreateFiatParams) => {
	const response = await fetchPost(`${BACKEND}/fiats/create`, data);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const fetchListFiats = async () => {
	const response = await fetchGet(`${BACKEND}/fiats`);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const fetchCreateAllFiats = async () => {
	const response = await fetchPost(`${BACKEND}/fiats/json/create`);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const setter = (
	data: any[],
	loading: boolean,
	fetched: boolean,
	errors: string[]
) => {
	fiats.set({
		data,
		loading,
		fetched,
		errors
	});
};

export const createFiat = async (dataParams: CreateFiatParams) => {
	setter([], true, false, []);
	const created = await fetchCreateFiat(dataParams);

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter([], false, true, []);
};

export const listFiats = async () => {
	setter([], true, false, []);
	const list = await fetchListFiats();

	if (!list) {
		setter([], false, true, []);
		return null;
	}

	setter(list, false, true, []);
};

export const createAllFiats = async () => {
	setter([], true, false, []);
	const created = await fetchCreateAllFiats();

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter(created, false, true, []);
};
