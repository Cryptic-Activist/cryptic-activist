export type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
  image: string;
};

export type CryptocurrencySetter = {
  id?: string;
  name?: string;
  symbol?: string;
  coingeckoId?: string;
  image?: string;
};

export type Value = CryptocurrencySetter;

export type CryptocurrencyStore = {
  cryptocurrency: {
    id?: string;
    name?: string;
    symbol?: string;
    coingeckoId?: string;
    image?: string;
    setCryptocurrencyValue: (
      value: Value,
      action?: `cryptocurrency/${string}`
    ) => void;
    setCryptocurrency: (cryptocurrency: Cryptocurrency) => void;
  };
};

export type CryptocurrencyState = Cryptocurrency;
