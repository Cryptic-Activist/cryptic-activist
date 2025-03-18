'use client';

import { CryptocurrencyCoinGeckoId, FiatSymbol } from './types';
import { DEFAULT_CRYPTOCURRENCY_ID, DEFAULT_FIAT_SYMBOL } from '@/constants';
import {
  useApp,
  useCryptocurrencies,
  useFiats,
  usePaymentMethods,
  useUser,
} from '@/hooks';

import { set } from 'react-hook-form';
import { useEffect } from 'react';
import { useRootStore } from '@/store';

const InitialSettings = () => {
  const { getFiats, getFiat, fiats } = useFiats();
  const { getCryptocurrencies, getCryptocurrency, cryptocurrencies } =
    useCryptocurrencies();
  const { getPaymentMethods } = usePaymentMethods();
  const { setValue, setCurrentPrice, app, checkIsMobile } = useApp();
  const {} = useUser();

  const setDefaultCryptocurrency = (coinGeckoId: CryptocurrencyCoinGeckoId) => {
    const cryptocurrency = getCryptocurrency(coinGeckoId);

    if (cryptocurrency) {
      setValue(
        {
          defaults: {
            cryptocurrency: {
              coingeckoId: cryptocurrency.coingeckoId,
              id: cryptocurrency.id,
              name: cryptocurrency.name,
              symbol: cryptocurrency.symbol,
              image: cryptocurrency.image,
            },
          },
        },
        'app/setDefaultCryptocurrency'
      );
    }
  };

  const setDefaultFiat = (symbol: FiatSymbol) => {
    const fiat = getFiat(symbol);

    if (fiat) {
      setValue(
        {
          defaults: {
            fiat: {
              id: fiat.id,
              name: fiat.name,
              symbol: fiat.symbol,
              country: fiat.country,
            },
          },
        },
        'app/setDefaultFiat'
      );
    }
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    checkIsMobile({ width: currentWidth, height: currentHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
