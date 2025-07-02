import { ReactElement } from 'react';

export type SelectorProps = {
  type:
    | 'cryptocurrency'
    | 'fiat'
    | 'paymentMethod'
    | 'paymentDetails'
    | 'chain'
    | 'wallet';
  hasLabel?: boolean;
  overrideLabel?: string;
  selected?: string;
};

export type BuildLabel = (symbol: string, name: string) => string;

export type BuildCryptocurrencyLabel = (
  image: string,
  name: string
) => ReactElement;
