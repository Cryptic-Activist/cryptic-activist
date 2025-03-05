export type Cryptocurrency = {
  id: string;
  coingeckoId: string;
  symbol: string;
  name: string;
  isDeleted: boolean;
  whenDelete: string;
  createdAt: string;
  updatedAt: string;
};

export type CryptocurrenciesState = {
  data: Cryptocurrency[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type CreateCryptocurrencyParams = {
  coingeckoId: string;
  symbol: string;
  name: string;
};
