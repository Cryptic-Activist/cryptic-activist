import { Chain } from '../chain/types';
import { Cryptocurrency } from '../cryptocurrency/types';

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
  tokens?: Token[];
};

export type Value = BlockchainSetter;

export type Token = {
  chain: Chain;
  cryptocurrency: Cryptocurrency;
  contractAddress: string | null;
  abiUrl: string | null;
};

export type BlockchainStore = {
  blockchain: {
    chain?: any;
    wallet?: string;
    account?: Account;
    balance?: Balance;
    tokens?: Token[];
    setBlockchainValue: (
      value: Value,
      actionName?: `blockchain/${string}`
    ) => void;
    resetBlockchain: () => void;
  };
};
