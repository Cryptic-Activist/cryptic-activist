import { map } from 'nanostores';

import type {
  Account,
  Balance,
  BlockchainSetter,
  BlockchainState,
  SetChainParam,
  SetProviderParam,
} from './types';
import { Connector } from 'wagmi';

export const $blockchain = map<BlockchainState>();

const setter = ({
  connector,
  chain,
  wallet,
  provider,
  account,
  balance,
}: BlockchainSetter) => {
  const blockchain = $blockchain.get();

  $blockchain.set({
    connector: connector ?? blockchain.connector,
    chain: chain ?? blockchain.chain,
    wallet: wallet ?? blockchain.wallet,
    provider: provider ?? blockchain.provider,
    account: account ?? blockchain.account,
    balance: balance ?? blockchain.balance,
  });
};

export const setChain = (chain: SetChainParam) => {
  setter({ chain });
};

export const setProvider = (provider: SetProviderParam) => {
  setter({ provider });
};

export const setWallet = (wallet: string) => {
  setter({ wallet });
};

export const setAccount = (account: Account) => {
  setter({ account });
};

export const setConnector = (connector: Connector) => {
  setter({ connector });
};

export const setBalance = (balance: Balance) => {
  setter({ balance });
};

export const resetBlockchain = () => {
  $blockchain.set({
    connector: undefined,
    chain: undefined,
    wallet: undefined,
    provider: undefined,
    account: undefined,
  });
};
