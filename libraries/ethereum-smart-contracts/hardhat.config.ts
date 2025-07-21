import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";

const {
  PRIVATE_KEY,
  ETHEREUM_RPC,
  SEPOLIA_RPC,
  POLYGON_RPC,
  AMOY_RPC,
  ARBITRUM_RPC,
  ARBITRUM_SEPOLIA_RPC,
  OPTIMISM_RPC,
  OPTIMISM_SEPOLIA_RPC,
} = process.env;

const PRIVATE_KEY_STRING = PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  sourcify: {
    enabled: true,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ethereum: {
      url: ETHEREUM_RPC,
      chainId: 1,
      accounts: [PRIVATE_KEY_STRING],
    },
    sepolia: {
      url: SEPOLIA_RPC,
      chainId: 11155111,
      accounts: [PRIVATE_KEY_STRING],
    },
    polygon: {
      url: POLYGON_RPC,
      chainId: 137,
      accounts: [PRIVATE_KEY_STRING],
    },
    amoy: {
      url: AMOY_RPC,
      chainId: 80002,
      accounts: [PRIVATE_KEY_STRING],
    },
    arbitrum: {
      url: ARBITRUM_RPC,
      chainId: 42161,
      accounts: [PRIVATE_KEY_STRING],
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC,
      chainId: 421614,
      accounts: [PRIVATE_KEY_STRING],
    },
    optimism: {
      url: OPTIMISM_RPC,
      chainId: 10,
      accounts: [PRIVATE_KEY_STRING],
    },
    optimismSepolia: {
      url: OPTIMISM_SEPOLIA_RPC,
      chainId: 11155420,
      accounts: [PRIVATE_KEY_STRING],
    },
  },
  solidity: {
    version: "0.8.28", // Must be ≥ 0.8.13 for viaIR
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimization runs
      },
      viaIR: true, // Enable IR pipeline
    },
  },
};

export default config;
