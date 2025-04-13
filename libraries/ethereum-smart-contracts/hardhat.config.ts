import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
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
