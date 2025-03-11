export type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
};

export type CryptocurrenciesStore = {
  data?: Cryptocurrency[];
  getCryptocurrencies: () => Promise<void>;
};

export type CryptocurrencyState = Cryptocurrency | object;

export type CryptocurrencySetter = Cryptocurrency;
