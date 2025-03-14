export type Fiat = {
  id: string;
  name: string;
  symbol: string;
};

export type FiatsStore = {
  fiats: {
    data?: Fiat[];
    setFiatsValue: (value: Value, action?: `fiats/${string}`) => void;
    getFiats: () => Promise<void>;
  };
};

export type FiatsSetter = {
  data: {
    id: string;
    name: string;
    symbol: string;
  }[];
};

export type Value = FiatsSetter;
