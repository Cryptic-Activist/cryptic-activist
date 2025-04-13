import { base, polygon } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

import { metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [polygon, base],
  connectors: [metaMask()],
  transports: {
    [polygon.id]: http(),
    [base.id]: http(),
  },
});
