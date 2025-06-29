import { Connector } from 'wagmi';

export const getChainNameById = (id: number) => {
  switch (id) {
    case 1:
      return 'Ethereum';
    case 137:
      return 'Polygon';
    case 1337:
      return 'Localhost';
    default:
      return `Chain-${id}`;
  }
};

export const getWalletType = (
  connector: Connector
): 'MetaMask' | 'WalletConnect' | 'Brave' | 'Unknown' => {
  const name = connector.name.toLowerCase();

  if (name.includes('metamask')) return 'MetaMask';
  if (name.includes('walletconnect')) return 'WalletConnect';
  if (name.includes('brave')) return 'Brave';
  return 'Unknown';
};

export const isSupportedChain = (
  id: number | undefined,
  supportedChainIds: { label: string; value: number }[]
): boolean => {
  return id != null && supportedChainIds.some((chain) => chain.value === id);
};
