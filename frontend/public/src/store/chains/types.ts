export type Chain = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
  logoUrl: string;
  chainId: number;
  description: string;
};

export type ChainsStore = {
  chains: {
    data?: Chain[];
    setChainsValue: (value: Value, action?: `chains/${string}`) => void;
    getChains: () => Promise<void>;
  };
};

export type ChainsSetter = {
  data: {
    id: string;
    name: string;
    symbol: string;
    coingeckoId: string;
    logoUrl: string;
    chainId: number;
  }[];
};

export type Value = ChainsSetter;
