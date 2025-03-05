import {
	CRYPTOCURRENCY_API,
	FIAT_API,
} from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';
import { toLowerCase } from '@utils/string/string';

import { AxiosResponse } from 'axios';
import type {
	GetPriceParams,
	GetDefaultFiatParams,
	GetDefaultCryptocurrencyParams,
} from './types';

const fetchPrice = async (
	coingeckoId: string,
	fiatSymbol: string
): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${CRYPTOCURRENCY_API}/cryptocurrency/price?id=${coingeckoId}&fiatSymbol=${fiatSymbol}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

const fetchFiat = async (defaultFiat: string): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${FIAT_API}/fiat?fiatSymbol=${defaultFiat}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

const fetchCryptocurrency = async (
	defaultCryptocurrency: string
): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${CRYPTOCURRENCY_API}/cryptocurrency?cryptocurrencySymbol=${defaultCryptocurrency}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getPrice = createAsyncThunk(
	'app/getPrice',
	async ({ coingeckoId, fiatSymbol }: GetPriceParams) => {
		try {
			const price = await fetchPrice(coingeckoId, fiatSymbol);

			if (!price) {
				return null;
			}

			return price.data.results[coingeckoId][toLowerCase(fiatSymbol)];
		} catch (err) {
			return null;
		}
	}
);

export const getDefaultFiat = createAsyncThunk(
	'app/getDefaultFiat',
	async ({ defaultFiat }: GetDefaultFiatParams) => {
		const fiat = await fetchFiat(defaultFiat);

		if (!fiat) {
			return null;
		}

		return fiat.data.results;
	}
);

export const getDefaultCryptocurrency = createAsyncThunk(
	'app/getDefaultCryptocurrency',
	async ({ defaultCryptocurrency }: GetDefaultCryptocurrencyParams) => {
		const cryptocurrency = await fetchCryptocurrency(defaultCryptocurrency);

		if (!cryptocurrency) {
			return null;
		}

		return cryptocurrency.data.results;
	}
);
