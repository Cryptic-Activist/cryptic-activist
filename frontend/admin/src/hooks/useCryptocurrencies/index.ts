'use client';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

import {
  createCryptocurrency,
  createAllCryptocurrencies,
  listCryptocurrencies,
  cryptocurrencies,
} from '@/stores/cryptocurrencies';
import type { CreateCryptocurrencyParams, UseCryptocurrenciesParams } from './types';

const useCryptocurrencies = (fetchData?: UseCryptocurrenciesParams) => {
  const $cryptocurrencies = useStore(cryptocurrencies);

  const handleCreateCryptocurrency = async (
    data: CreateCryptocurrencyParams
  ) => {
    await createCryptocurrency(data);
  };

  const handleListCryptocurrencies = async () => {
    await listCryptocurrencies();
  };

  const handleCreateAllCryptocurrencies = async () => {
    await createAllCryptocurrencies();
  };

  useEffect(() => {
    if (fetchData) {
      handleListCryptocurrencies();
    }
  }, [fetchData]);

  return {
    handleCreateCryptocurrency,
    handleCreateAllCryptocurrencies,
    handleListCryptocurrencies,
    cryptocurrencies: $cryptocurrencies,
  };
};

export default useCryptocurrencies;
