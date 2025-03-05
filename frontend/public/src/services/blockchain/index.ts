import { switchChain } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
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
  await switchChain(wagmiConfig, { chainId });
};
