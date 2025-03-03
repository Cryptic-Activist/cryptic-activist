import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism } from 'wagmi/chains';
import { injected, metaMask, safe, coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [metaMask(), coinbaseWallet(), injected()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
