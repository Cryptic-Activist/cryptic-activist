export type CryptocurrencyCoinGeckoId = string;

export type CryptocurrencyParams = {
  id?: string;
  coingeckoId?: string;
  symbol?: string;
  name?: string;
};

export type ChainParams = {
  id?: string;
  coingeckoId?: string;
  symbol?: string;
  name?: string;
  chainId?: number;
  logoUrl?: string;
};
