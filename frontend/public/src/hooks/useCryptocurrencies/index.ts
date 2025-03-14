'use client';

import { Cryptocurrency } from '@/zustand/cryptocurrency/types';
import { CryptocurrencyCoinGeckoId } from './types';
import { toLowerCase } from '@/utils';
import { useApp } from '@/hooks';
import { useRootStore } from '@/zustand';
import { useState } from 'react';

const useCryptocurrency = () => {
  const { setValue } = useApp();
  const { cryptocurrencies } = useRootStore();
  const [cryptocurrenciesList, setCryptocurrenciesList] = useState(
    cryptocurrencies.data
  );

  const getCryptocurrencies = () => {
    cryptocurrencies.getCryptocurrencies();
  };

  const getCryptocurrency = (coingeckoId: CryptocurrencyCoinGeckoId) => {
    if (!cryptocurrencies.data) {
      return null;
    }

    const cryptocurrency = cryptocurrencies.data?.filter(
      (crypto) => crypto.coingeckoId === coingeckoId
    );

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
          },
        },
      },
      'app/setDefaultCryptocurrency'
    );
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
    getCryptocurrencies,
    getCryptocurrency,
    setCryptocurrency,
    filterCryptocurrencies,
  };
};

export default useCryptocurrency;
