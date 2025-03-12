export type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
};

export type CryptocurrencySetter = {
  id?: string;
  name?: string;
  symbol?: string;
  coingeckoId?: string;
};

export type Value = CryptocurrencySetter;

export type CryptocurrencyStore = {
  cryptocurrency: {
    id?: string;
    name?: string;
    symbol?: string;
    coingeckoId?: string;
    setCryptocurrencyValue: (value: Value) => void;
    getCryptocurrency: () => Promise<void>;
  };
};

export type CryptocurrencyState = Cryptocurrency;
