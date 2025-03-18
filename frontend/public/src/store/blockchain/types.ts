export type SetChainParam = any;
export type SetProviderParam = any;
export type Wallet = string;

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
  chain?: any;
  wallet?: string;
  account?: Account;
  balance?: Balance;
};

export type Value = BlockchainSetter;

export type BlockchainStore = {
  blockchain: {
    chain?: any;
    wallet?: string;
    account?: Account;
    balance?: Balance;
    setBlockchainValue: (
      value: Value,
      actionName?: `blockchain/${string}`
    ) => void;
    resetBlockchain: () => void;
  };
};
