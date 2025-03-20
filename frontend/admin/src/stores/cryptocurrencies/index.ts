import type {
	CreateCryptocurrencyParams,
	CryptocurrenciesState
} from './types';
import { fetchGet, fetchPost } from '@/services/axios';
import { getBearerToken, getLocalStorage } from '@/utils/browser/storage';

import { BACKEND } from '@/constants/envs';
import { map } from 'nanostores';

export const cryptocurrencies = map<CryptocurrenciesState>({
	data: [],
	loading: false,
	fetched: false,
	errors: []
});

const fetchCreateCryptocurrency = async (data: CreateCryptocurrencyParams) => {
	const response = await fetchPost(
		`${BACKEND}/cryptocurrencies/coin-gecko/create`,
		data
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const fetchListCryptocurrencies = async () => {
	const response = await fetchGet(`${BACKEND}/cryptocurrencies`);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const fetchCreateAllCryptocurrencies = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${BACKEND}/cryptocurrencies/coin-gecko/create`,
		undefined,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

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
	cryptocurrencies.set({
		data,
		loading,
		fetched,
		errors
	});
};

export const createCryptocurrency = async (
	dataParams: CreateCryptocurrencyParams
) => {
	setter([], true, false, []);
	const created = await fetchCreateCryptocurrency(dataParams);

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter([], false, true, []);
};

export const listCryptocurrencies = async () => {
	setter([], true, false, []);
	const list = await fetchListCryptocurrencies();

	if (!list) {
		setter([], false, true, []);
		return null;
	}

	setter(list, false, true, []);
};

export const createAllCryptocurrencies = async () => {
	setter([], true, false, []);
	const created = await fetchCreateAllCryptocurrencies();

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter(created, false, true, []);
};
