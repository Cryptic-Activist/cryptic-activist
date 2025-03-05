import { map } from 'nanostores';

import type {
  Cryptocurrency,
  CryptocurrencySetter,
  CryptocurrencyState,
} from './types';

export const $cryptocurrency = map<CryptocurrencyState>({});

const setter = ({ coingeckoId, id, name, symbol }: CryptocurrencySetter) => {
  $cryptocurrency.set({
    coingeckoId,
    id,
    name,
    symbol,
  });
};

export const setCryptocurrency = (cryptocurrency: Cryptocurrency) => {
  setter(cryptocurrency);
};
