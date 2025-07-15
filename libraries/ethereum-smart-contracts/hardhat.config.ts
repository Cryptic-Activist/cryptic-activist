import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";

console.log({ processL: process.env.PLATFORM_WALLET_PRIVATE_KEY });

const config: HardhatUserConfig = {
  sourcify: {
    enabled: true,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PLATFORM_WALLET_PRIVATE_KEY as string], // use dotenv to load this safely
      chainId: 80002,
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
