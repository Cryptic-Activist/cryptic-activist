export type Fiat = {
  id: string;
  name: string;
  symbol: string;
};

export type FiatsState = {
  data?: Fiat[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type FiatsSetter = FiatsState;
