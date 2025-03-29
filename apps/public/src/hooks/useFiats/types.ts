export type FiatParams = {
  id?: string;
  symbol?: string;
  name?: string;
};

export type FiatSymbol = string;

export type FiatList = {
  country: string;
  flag: string;
  name: string;
  symbol: string;
  id: string;
}[];
