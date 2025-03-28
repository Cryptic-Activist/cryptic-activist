export type Fiat = {
  id: string;
  name: string;
  symbol: string;
  isDeleted: boolean;
  whenDelete: string;
  createdAt: string;
  updatedAt: string;
};

export type FiatsState = {
  data: Fiat[];
  loading: boolean;
  fetched: boolean;
  errors: string[];
};

export type CreateFiatParams = {
  name: string;
  symbol: string;
};
