export type Fiat = {
  id: string;
  name: string;
  symbol: string;
};

export type FiatState = Fiat | object;

export type FiatSetter = Fiat;
