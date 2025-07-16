export const curatedTokenAddresses = {
  ethereumMainnet: [
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    '0x514910771AF9Ca656af840dff83E8264EcF986CA', // Chainlink
    '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3', // LEO
    '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', // Shiba Inu
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // Uniswap
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', // Aave
    '0xfAbA6f8e4a5E8Ab82F62fe7C39859FA577269BE3', // Ondo Finance
    '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6', // Polygon (POL)
    '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', // Arbitrum (ARB)
    '0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24', // Render Token (RNDR)
    '0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF', // Immutable X (IMX)
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', // Lido DAO Token (LDO)
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  ],
  polygonMainnet: [
    '0x0000000000000000000000000000000000001010', // POL
    '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39', // Chainlink
    '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', // Uniswap
    '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', // Aave
    '0x172370d5Cd63279eFa6d502DAB29171933a610AF', // Curve (CRV)
    '0x41b3966B4FF7b427969ddf5da3627d6AEAE9a48E', // Nexo (NEXO)
    '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC
  ],
  arbitrumMainnet: [
    '0x912CE59144191C1204E64559FE8253a0e49E6548', // Arbitrum (ARB)
    '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4', // Chainlink (LINK)
    '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0', // Uniswap (UNI)
    '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196', // Aave (AAVE)
    '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978', // Curve DAO Token (CRV)
    '0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c', // PancakeSwap (CAKE)
    '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A', // SushiSwap (SUSHI)
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC
  ],
  optimismMainnet: [
    '0x4200000000000000000000000000000000000042', // OP Token
    '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6', // Chainlink (LINK)
    '0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53', // Curve DAO Token (CRV)
    '0xFdb794692724153d1488CcdBE0C56c252596735F', // Lido DAO Token (LDO)
    '0x6fd9d7AD17242c41f7131d257212c54A0e816691', // Uniswap (UNI)
  ],
};

// export const curatedTokenAddressesTestnets = {
//   ethereumTestnet: [
//     '0xdd13E55209Fd76AfE204dBda4007C227904f0a81', // WETH (Sepolia)
//     '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Chainlink (Sepolia)
//     // LEO, Shiba Inu, Uniswap, Aave, Ondo, POL, Arbitrum, Render, Immutable, Lido, USDT, USDC
//     // — Sepolia versions often don't exist or are deployed by users, so placeholder or mainnet bridging might be used
//   ],
//   polygonTestnet: [
//     // Polygon Amoy testnet tokens (same as previous Amoy list)
//     '0x0000000000000000000000000000000000001010', // MATIC (Amoy native token placeholder)
//     '0x0f7E9e9Fc8255f10cBc27A5729B882D2f7bcf27e', // Chainlink (Amoy)
//     '0x1e7f64C7B4Bd5E63a8771A777c53F72782e691d7', // Uniswap (Amoy)
//     '0xa7a47e9956e4a9d3c1d4c7f8b9b1c6c70bb264c1', // Aave (Amoy)
//     '0xf8903D5E3bcB9aFAa0dB074dB7e5fE86Df8817E9', // Render (Amoy)
//     '0x9C1eF0C9d971580Ca04eEcF7A90c51629F16E23B', // Cosmos (Amoy)
//     '0x0bc9a42e773e4767e5e5caaf0e2d278c66a88946', // Curve (Amoy)
//     '0x28C7a6e9BfFA0D3b1778e0d9b64D8f7e0d77A1A3', // The Graph (Amoy)
//     '0x16D3d252E3B36B97F7cE9E6Dd8C7eF07f1d2Bf2E', // SuperVerse (Amoy)
//     '0x12f5a1e00f30cB273cE7cE8d1B2B53B3b8D8e46b', // Nexo (Amoy)
//     '0x0b7d8fa12c3b3a15db1b8a1f9f9f0d8d9f9a8b77', // Synthetix (Amoy)
//     '0x40f7F8C1e7bD1e17f9a0a2eE4Fb0dF59eCc33Bd3', // SushiSwap (Amoy)
//     '0xF3A5f0b3B7f9F9c7E4cF1A2D9bA3D3D6E3cF9A1E', // USDT (Amoy)
//     '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC (Amoy)
//   ],
//   arbitrumTestnet: [
//     '0x14a5EC4B7eA59115d1d057D4f99C2a2149e00345', // WETH (Sepolia on Arbitrum Nova / Test)
//     '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Chainlink (Sepolia)
//     // Uniswap, Aave, Curve, The Graph, PancakeSwap, Lido, Compound, SushiSwap, GMX, USDT, USDC - as deployed/test versions or placeholders
//   ],
//   optimismTestnet: [
//     '0x4200000000000000000000000000000000000042', // OP Token (Optimism Goerli / Sepolia)
//     '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Chainlink (Sepolia)
//     '0x76Fb31fb4AF56892a25E32cFc43De717950c9278', // Aave (Sepolia)
//     '0x0994206dfe8de6ec6920ff4d779b0d950605fb53', // Curve (Sepolia)
//     '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', // Lido (Sepolia)
//     '0x50b728d8d964fd00c2d0aad81718b71311fef68a', // Synthetix (Sepolia)
//     '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a', // SushiSwap (Sepolia)
//     '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // Uniswap (Sepolia)
//     '0x7F5c764cBc14f9669B88837ca1490f2Cde6eCBa2', // USDC (Sepolia)
//   ],
// };

export const chainEndpoints = {
  ethereum: { url: 'https://api.etherscan.io/v2', chainId: 1 },
  polygon: { url: 'https://api.etherscan.io/v2', chainId: 137 },
  arbitrum: { url: 'https://api.etherscan.io/v2', chainId: 42161 },
  optimism: { url: 'https://api.etherscan.io/v2', chainId: 10 },
  // sepolia: { url: 'https://api-sepolia.etherscan.io/v2', chainId: 11155111 },
  // amoy: { url: 'https://api-amoy.polygonscan.com/v2', chainId: 80002 },
  // 'arbitrum-sepolia': { url: 'https://api-sepolia.arbiscan.io/v2', chainId: 421614 },
  // 'optimism-sepolia': { url: 'https://api-sepolia-optimistic.etherscan.io/v2', chainId: 11155420 },
};

export const chainMapping = {
  ethereum: 'ethereumMainnet',
  polygon: 'polygonMainnet',
  arbitrum: 'arbitrumMainnet',
  optimism: 'optimismMainnet',
  // sepolia: 'ethereumTestnet',
  // amoy: 'polygonTestnet',
  // 'arbitrum-sepolia': 'arbitrumTestnet',
  // 'optimism-sepolia': 'optimismTestnet',
};
