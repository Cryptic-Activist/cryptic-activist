import { map } from 'nanostores';

import { fetchCryptocurrencies } from '@/services/cryptocurrencies';

import type { CryptocurrenciesSetter, CryptocurrenciesState } from './types';

export const $cryptocurrencies = map<CryptocurrenciesState>({
  errors: [],
  fetched: false,
  loading: false,
});

const setter = ({ errors, fetched, loading, data }: CryptocurrenciesSetter) => {
  const cryptocurrencies = $cryptocurrencies.get();

  const localErrors = errors ?? cryptocurrencies.errors;
  const localFetched = fetched ?? cryptocurrencies.fetched;
  const localLoading = loading ?? cryptocurrencies.loading;
  const localData = data ?? cryptocurrencies.data;

  $cryptocurrencies.set({
    errors: localErrors,
    fetched: localFetched,
    loading: localLoading,
    data: localData,
  });
};

export const getCryptocurrencies = async () => {
  const cryptocurrencies = await fetchCryptocurrencies();

  if (!cryptocurrencies) {
    setter({
      errors: ['Unable to fetch cryptocurrencies'],
      fetched: true,
      loading: false,
    });
  }

  setter({
    errors: [],
    fetched: true,
    loading: false,
    data: cryptocurrencies,
  });
};
