import { map } from 'nanostores';

import { CRYPTOCURRENCY_API } from '@/constants/envs';
import { fetchGet, fetchPost } from '@/services/axios';
import { getBearerToken, getLocalStorage } from '@/utils/browser/storage';

import type {
	CreateCryptocurrencyParams,
	CryptocurrenciesState
} from './types';

export const cryptocurrencies = map<CryptocurrenciesState>({
	data: [],
	loading: false,
	fetched: false,
	errors: []
});

const fetchCreateCryptocurrency = async (data: CreateCryptocurrencyParams) => {
	const response = await fetchPost(
		`${CRYPTOCURRENCY_API}/cryptocurrencies/coin-gecko/create`,
		data
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data.results;
};

const fetchListCryptocurrencies = async () => {
	const response = await fetchGet(`${CRYPTOCURRENCY_API}/cryptocurrencies`);

	if (response.status !== 200) {
		return null;
	}

	return response.data.results;
};

const fetchCreateAllCryptocurrencies = async () => {
	const accessToken = getLocalStorage('accessToken');

	if (!accessToken) {
		return null;
	}

	const response = await fetchPost(
		`${CRYPTOCURRENCY_API}/cryptocurrencies/coin-gecko/create`,
		undefined,
		{
			Authorization: getBearerToken(accessToken)
		}
	);

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
