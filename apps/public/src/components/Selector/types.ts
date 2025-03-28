import { ReactElement } from 'react';

export type SelectorProps = {
  type: 'cryptocurrency' | 'fiat';
  hasLabel?: boolean;
};

export type BuildLabel = (symbol: string, name: string) => string;

export type BuildCryptocurrencyLabel = (
  image: string,
  name: string
) => ReactElement;
