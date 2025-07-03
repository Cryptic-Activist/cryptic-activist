export type Chain = {
  id: string;
  name: string;
  symbol: string;
  coingeckoId: string;
  logoUrl: string;
  chainId: number;
};

export type ChainSetter = {
  id?: string;
  name?: string;
  symbol?: string;
  coingeckoId?: string;
  logoUrl?: string;
  chainId?: number;
};

export type Value = ChainSetter;

export type ChainStore = {
  chain: {
    id?: string;
    name?: string;
    symbol?: string;
    coingeckoId?: string;
    logoUrl?: string;
    chainId?: number;
    setChainValue: (value: Value, action?: `chain/${string}`) => void;
    setChain: (chain: Chain) => void;
  };
};

export type ChainState = Chain;
