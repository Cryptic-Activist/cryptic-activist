export type Fiat = {
  id: string;
  name: string;
  symbol: string;
};

export type FiatSetter = {
  id?: string;
  name?: string;
  symbol?: string;
};

export type Value = FiatSetter;

export type FiatStore = {
  fiat: {
    id?: string;
    name?: string;
    symbol?: string;
    setFiatValue: (value: Value, action?: `fiat/${string}`) => void;
    setFiat: (fiat: Fiat) => void;
  };
};
