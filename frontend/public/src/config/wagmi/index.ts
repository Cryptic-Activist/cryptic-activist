import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  goChain,
  localhost,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  sepolia,
} from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

import { IS_DEVELOPMENT } from '@/constants';
import { metaMask } from 'wagmi/connectors';

const hardhat1337 = {
  id: 31337,
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['http://localhost:8545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Localhost',
      url: '',
    },
  },
  testnet: true,
};

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
    ...(IS_DEVELOPMENT ? [hardhat1337] : []),
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
    ...(IS_DEVELOPMENT && { [hardhat1337.id]: http() }),
  },
});
