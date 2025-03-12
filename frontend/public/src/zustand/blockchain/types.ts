import { Connector } from 'wagmi';

export type SetChainParam = any;
export type SetProviderParam = any;

export type Account = {
  address: string;
};

export type Balance = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

export type BlockchainSetter = {
  connector?: Connector;
  chain?: any;
  wallet?: string;
  provider?: any;
  account?: Account;
  balance?: Balance;
};

export type Value = BlockchainSetter;

export type BlockchainStore = {
  blockchain: {
    connector?: Connector;
    chain?: any;
    wallet?: string;
    provider?: any;
    account?: Account;
    balance?: Balance;
    setBlockchainValue: (
      value: Value,
      actionName?: `blockchain/${string}`
    ) => void;
    resetBlockchain: () => void;
  };
};
