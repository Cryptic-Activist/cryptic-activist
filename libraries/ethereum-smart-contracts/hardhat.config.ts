import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [process.env.PRIVATE_KEY as string],
    // },
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
