'use client';

import { CryptocurrencyCoinGeckoId, CryptocurrencyParams } from './types';
import { setLocalStorage, toLowerCase } from '@/utils';

import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';
import { useState } from 'react';

const useCryptocurrency = () => {
  const { setValue } = useApp();
  const { cryptocurrencies } = useRootStore();
  const [cryptocurrenciesList, setCryptocurrenciesList] = useState(
    cryptocurrencies.data
  );

  const getCryptocurrency = (params: CryptocurrencyParams) => {
    if (!cryptocurrencies.data) {
      return null;
    }

    const cryptocurrency = cryptocurrencies.data?.filter((crypto) => {
      if (params.id) {
        return crypto.id === params.id;
      } else if (params.name) {
        return crypto.name === params.name;
      } else if (params.symbol) {
        return crypto.symbol === params.symbol;
      } else if (params.coingeckoId) {
        return crypto.coingeckoId === params.coingeckoId;
      }
    });

    const hasFound = cryptocurrency.length > 0;

    if (!hasFound) {
      return null;
    }

    return cryptocurrency[0];
  };

  const setCryptocurrency = (cryptocurrency: Cryptocurrency) => {
    setValue(
      {
        defaults: {
          cryptocurrency: {
            id: cryptocurrency.id,
            name: cryptocurrency.name,
            symbol: cryptocurrency.symbol,
            coingeckoId: cryptocurrency.coingeckoId,
            image: cryptocurrency.image,
          },
        },
      },
      'app/setDefaultCryptocurrency'
    );
    setLocalStorage('DEFAULT_CRYPTOCURRENCY_ID', cryptocurrency.id);
  };

  const filterCryptocurrencies = (term: string) => {
    if (!cryptocurrencies.data) return;
    const filtered = cryptocurrencies.data.filter((cryptocurrency) => {
      const lowerCryptocurrencyName = toLowerCase(cryptocurrency.name);
      const lowerCryptocurrencySymbol = toLowerCase(cryptocurrency.symbol);
      const lowerTerm = toLowerCase(term);

      return (
        lowerCryptocurrencyName.includes(lowerTerm) ||
        lowerCryptocurrencySymbol.includes(lowerTerm) ||
        `${lowerCryptocurrencySymbol} - ${lowerCryptocurrencyName}`.includes(
          lowerTerm
        )
      );
    });

    setCryptocurrenciesList(filtered);
  };

  return {
    cryptocurrencies,
    cryptocurrenciesList,
    getCryptocurrencies: cryptocurrencies.getCryptocurrencies,
    getCryptocurrency,
    setCryptocurrency,
    filterCryptocurrencies,
  };
};

export default useCryptocurrency;
