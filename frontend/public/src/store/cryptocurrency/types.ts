export type Cryptocurrency = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
};

export type CryptocurrencyState = Cryptocurrency | {};

export type CryptocurrencySetter = Cryptocurrency;
