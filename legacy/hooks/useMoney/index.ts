import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import {
	getDefaultCryptocurrency as getDefaultCryptocurrencyThunk,
	getDefaultFiat as getDefaultFiatThunk,
	getPrice,
} from '@store/thunks/app';
import { getCryptocurrencies as getCryptocurrenciesThunk } from '@store/thunks/cryptocurrencies';
import { getFiats as getFiatsThunk } from '@store/thunks/fiats';

import { UseMoneyProps } from './type';

const useMoney = ({ defaultCryptocurrency, defaultFiat }: UseMoneyProps) => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);

	const getDefaultFiat = async () => {
		dispatch(getDefaultFiatThunk({ defaultFiat }));
	};

	const getDefaultCryptocurrency = async () => {
		dispatch(getDefaultCryptocurrencyThunk({ defaultCryptocurrency }));
	};

	const getCryptocurrencies = async () => {
		dispatch(getCryptocurrenciesThunk());
	};

	const getFiats = async () => {
		dispatch(getFiatsThunk());
	};

	useEffect(() => {
		const getCurrentPrice = async (coingeckoId: string, fiatSymbol: string) => {
			dispatch(
				getPrice({
					coingeckoId: coingeckoId,
					fiatSymbol: fiatSymbol,
				})
			);

			// setCurrentPrice(response);
		};

		if (app.defaults.cryptocurrency?.coingeckoId && app.defaults.fiat?.symbol) {
			getCurrentPrice(
				app.defaults.cryptocurrency?.coingeckoId,
				app.defaults.fiat?.symbol
			);
		}
	}, [app.defaults.cryptocurrency?.coingeckoId, app.defaults.fiat?.symbol]);

	useEffect(() => {
		getDefaultFiat();
		getDefaultCryptocurrency();
		getCryptocurrencies();
		getFiats();
	}, []);

	return {};
};

export default useMoney;
