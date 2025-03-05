import { map } from 'nanostores';

import { fetchFiats } from '@/services/fiats';
import type { FiatsSetter, FiatsState } from './types';

export const $fiats = map<FiatsState>({
  errors: [],
  fetched: false,
  loading: false,
});

const setter = ({ errors, fetched, loading, data }: FiatsSetter) => {
  const fiats = $fiats.get();

  const localErrors = errors ?? fiats.errors;
  const localFetched = fetched ?? fiats.fetched;
  const localLoading = loading ?? fiats.loading;
  const localData = data ?? fiats.data;

  $fiats.set({
    errors: localErrors,
    fetched: localFetched,
    loading: localLoading,
    data: localData,
  });
};

export const getFiats = async () => {
  const fiats = await fetchFiats();

  if (!fiats) {
    setter({
      errors: ['Unable to fetch fiats'],
      fetched: true,
      loading: false,
    });
  }

  setter({
    errors: [],
    fetched: true,
    loading: false,
    data: fiats!.data.results,
  });
};
