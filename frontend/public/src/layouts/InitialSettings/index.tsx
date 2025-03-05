'use client';

import { useEffect } from 'react';

import { DEFAULT_CRYPTOCURRENCY_ID, DEFAULT_FIAT_SYMBOL } from '@/constants';
import {
  useApp,
  useCryptocurrencies,
  useFiats,
  usePaymentMethods,
  useUser,
} from '@/hooks';

import { CryptocurrencyCoinGeckoId, FiatSymbol } from './types';

const InitialSettings = () => {
  const { getFiats, getFiat, fiats } = useFiats();
  const { getCryptocurrencies, getCryptocurrency, cryptocurrencies } =
    useCryptocurrencies();
  const { getPaymentMethods } = usePaymentMethods();
  const { setValue, setCurrentPrice, app } = useApp();
  const { user } = useUser(true);

  const setDefaultCryptocurrency = (coinGeckoId: CryptocurrencyCoinGeckoId) => {
    const cryptocurrency = getCryptocurrency(coinGeckoId);

    if (cryptocurrency) {
      setValue({
        defaults: {
          cryptocurrency: {
            coingeckoId: cryptocurrency.coingeckoId,
            id: cryptocurrency.id,
            name: cryptocurrency.name,
            symbol: cryptocurrency.symbol,
          },
        },
      });
    }
  };

  const setDefaultFiat = (symbol: FiatSymbol) => {
    const fiat = getFiat(symbol);

    if (fiat) {
      setValue({
        defaults: {
          fiat: {
            id: fiat.id,
            name: fiat.name,
            symbol: fiat.symbol,
          },
        },
      });
    }
  };

  useEffect(() => {
    getCryptocurrencies();
    getFiats();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    if (cryptocurrencies.data) {
      setDefaultCryptocurrency(DEFAULT_CRYPTOCURRENCY_ID);
    }
  }, [cryptocurrencies.data]);

  useEffect(() => {
    if (fiats.data) {
      setDefaultFiat(DEFAULT_FIAT_SYMBOL);
    }
  }, [fiats.data]);

  useEffect(() => {
    setCurrentPrice();
  }, [app.defaults.cryptocurrency?.coingeckoId, app.defaults.fiat?.symbol]);

  return <></>;
};

export default InitialSettings;
