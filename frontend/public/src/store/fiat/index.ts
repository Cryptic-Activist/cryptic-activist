import { map } from 'nanostores';

import type { Fiat, FiatSetter, FiatState } from './types';

export const $fiat = map<FiatState>({});

const setter = ({ id, name, symbol }: FiatSetter) => {
  $fiat.set({
    id,
    name,
    symbol,
  });
};

export const setFiat = (fiat: Fiat) => {
  setter(fiat);
};
