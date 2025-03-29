import { Config, getConnections, switchChain } from '@wagmi/core';

import { Connector } from 'wagmi';
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
