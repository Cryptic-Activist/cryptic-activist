import { Config, getConnections, switchChain } from '@wagmi/core';

import { BACKEND } from '@/constants';
import { Connector } from 'wagmi';
import { fetchGet } from '../axios';
import { wagmiConfig } from '@/config';

export const checkInstalledWallet = async (connector: Connector) => {
  const provider = (await connector.getProvider()) as any;

  if (
    provider.isCoinbaseWallet ||
    provider.isMetaMask ||
    provider.isTrust ||
    provider.isBraveWallet ||
    provider.isSafe
  ) {
    return true;
  }

  return false;
};

export const changeChain = async (chainId: 1 | 8453) => {
  await switchChain(wagmiConfig as Config, { chainId });
};

export const getCurrentConnector = () => {
  const connections = getConnections(wagmiConfig as Config);
  if (connections.length > 0) {
    return connections[0].connector;
  } else {
    return null;
  }
};

export const getSupportedChains = async () => {
  const response = await fetchGet(
    `${BACKEND}/blockchains/wallet/supported/chains`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const getSupportedTokens = async (chainId: number) => {
  const response = await fetchGet(
    `${BACKEND}/cryptocurrencies/supported/${chainId}/tokens`
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
