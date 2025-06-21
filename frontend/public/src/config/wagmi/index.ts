import { base, localhost, mainnet, polygon, polygonAmoy } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

import { metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, base, localhost, polygonAmoy],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [localhost.id]: http(),
    [polygonAmoy.id]: http(),
    [base.id]: http(),
  },
});
