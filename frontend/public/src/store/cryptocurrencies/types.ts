export type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
  image: string;
};

export type CryptocurrenciesStore = {
  cryptocurrencies: {
    data?: Cryptocurrency[];
    setCryptocurrenciesValue: (
      value: Value,
      action?: `cryptocurrencies/${string}`
    ) => void;
    getCryptocurrencies: (chainId: number) => Promise<void>;
  };
};

export type CryptocurrenciesSetter = {
  data: {
    id: string;
    name: string;
    symbol: string;
    coingeckoId: string;
    image: string;
  }[];
};

export type Value = CryptocurrenciesSetter;
