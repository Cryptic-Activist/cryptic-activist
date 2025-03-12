import { base, mainnet, optimism } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask, safe } from 'wagmi/connectors';
import { createConfig, http } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
