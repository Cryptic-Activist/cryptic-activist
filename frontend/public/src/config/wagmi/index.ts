import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  localhost,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
} from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

import { metaMask } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    polygon,
    base,
    bsc,
    arbitrum,
    optimism,
    localhost,
    sepolia,
    polygonAmoy,
    arbitrumSepolia,
    baseSepolia,
    optimismSepolia,
    bscTestnet,
  ],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [localhost.id]: http(),
    [polygonAmoy.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
});
