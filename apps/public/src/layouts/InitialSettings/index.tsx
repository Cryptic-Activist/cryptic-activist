'use client';

import { DEFAULT_CRYPTOCURRENCY_ID, DEFAULT_FIAT_SYMBOL } from '@/constants';
import { getLocalStorage, setLocalStorage } from '@/utils';
import {
  useApp,
  useCryptocurrencies,
  useFiats,
  usePaymentMethods,
  useUser,
} from '@/hooks';

import { CryptocurrencyParams } from '@/hooks/useCryptocurrencies/types';
import { FiatParams } from '@/hooks/useFiats/types';
import { useEffect } from 'react';

const InitialSettings = () => {
  const { getFiats, getFiat, fiats } = useFiats();
  const { getCryptocurrencies, getCryptocurrency, cryptocurrencies } =
    useCryptocurrencies();
  const { getPaymentMethods } = usePaymentMethods();
  const { setValue, setCurrentPrice, app, checkIsMobile } = useApp();
  const {} = useUser();

  const setDefaultCryptocurrency = (params: CryptocurrencyParams) => {
    const cryptocurrency = getCryptocurrency(params);

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
      setLocalStorage('DEFAULT_CRYPTOCURRENCY_ID', cryptocurrency.id);
    }
  };

  const setDefaultFiat = (params: FiatParams) => {
    const fiat = getFiat(params);

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
      setLocalStorage('DEFAULT_FIAT_ID', fiat.id);
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
      const localStorageCryptocurrency = getLocalStorage(
        'DEFAULT_CRYPTOCURRENCY_ID'
      );

      if (localStorageCryptocurrency) {
        setDefaultCryptocurrency({ id: localStorageCryptocurrency });
        return;
      }

      setDefaultCryptocurrency({ coingeckoId: DEFAULT_CRYPTOCURRENCY_ID });
    }
  }, [cryptocurrencies.data]);

  useEffect(() => {
    if (fiats.data) {
      const localStorageFiat = getLocalStorage('DEFAULT_FIAT_ID');

      if (localStorageFiat) {
        setDefaultFiat({ id: localStorageFiat });
        return;
      }

      setDefaultFiat({ symbol: DEFAULT_FIAT_SYMBOL });
    }
  }, [fiats.data]);

  useEffect(() => {
    setCurrentPrice();
  }, [app.defaults.cryptocurrency?.coingeckoId, app.defaults.fiat?.symbol]);

  return <></>;
};

export default InitialSettings;
