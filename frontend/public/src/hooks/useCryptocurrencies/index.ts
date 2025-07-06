'use client';

import { ChainParams, CryptocurrencyParams } from './types';
import { setLocalStorage, toLowerCase } from '@/utils';

import { Chain } from '@/store/chain/types';
import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { useApp } from '@/hooks';
import { useRootStore } from '@/store';
import { useState } from 'react';

const useCryptocurrency = () => {
  const { setValue } = useApp();
  const { cryptocurrencies, chains } = useRootStore();
  const [cryptocurrenciesList, setCryptocurrenciesList] = useState(
    cryptocurrencies.data
  );
  const [chainsList, setChainsList] = useState(chains.data);

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

  const getChain = (params: ChainParams) => {
    if (!chains.data) {
      return null;
    }

    const chain = chains.data?.filter((chain) => {
      if (params.id) {
        return chain.id === params.id;
      } else if (params.name) {
        return chain.name === params.name;
      } else if (params.symbol) {
        return chain.symbol === params.symbol;
      } else if (params.coingeckoId) {
        return chain.coingeckoId === params.coingeckoId;
      } else if (params.chainId) {
        return chain.chainId === params.chainId;
      }
    });

    const hasFound = chain.length > 0;

    if (!hasFound) {
      return null;
    }

    return chain[0];
  };

  const setChain = (chain: Chain) => {
    setValue(
      {
        defaults: {
          chain: {
            id: chain.id,
            name: chain.name,
            symbol: chain.symbol,
            coingeckoId: chain.coingeckoId,
            logoUrl: chain.logoUrl,
            chainId: chain.chainId,
            description: chain.description,
          },
        },
      },
      'app/setDefaultChain'
    );
    setLocalStorage('DEFAULT_CHAIN_ID', chain.id);
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

  const filterChains = (term: string) => {
    if (!chains.data) return;
    const filtered = chains.data.filter((chain) => {
      const lowerChainName = toLowerCase(chain.name);
      const lowerChainSymbol = toLowerCase(chain.symbol);
      const lowerTerm = toLowerCase(term);

      return (
        lowerChainName.includes(lowerTerm) ||
        lowerChainSymbol.includes(lowerTerm) ||
        `${lowerChainSymbol} - ${lowerChainName}`.includes(lowerTerm)
      );
    });

    setChainsList(filtered);
  };

  return {
    cryptocurrencies,
    cryptocurrenciesList,
    chains,
    chainsList,
    getCryptocurrencies: cryptocurrencies.getCryptocurrencies,
    getCryptocurrency,
    setCryptocurrency,
    getChain,
    getChains: chains.getChains,
    setChain,
    filterCryptocurrencies,
    filterChains,
  };
};

export default useCryptocurrency;
