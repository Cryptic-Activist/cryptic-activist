import 'dotenv/config';

import { IS_DEVELOPMENT, TIER_VOLUME } from '@/constants';
import { getPublicSettings, getSetting } from '@/utils/settings';

import bcrypt from 'bcryptjs';
import fiatsJson from '../../fiats.json';
import { generatePrivateKeysBip39 } from '@/utils/privateKeys';
import { getRandomHighContrastColor } from '@/utils/color';
import { prisma } from '../services/db';

const main = async () => {
  // Create General Platform Settings
  const settings = await prisma.platformSetting.createMany({
    data: [
      {
        key: 'depositPerTradePercent',
        type: 'NUMBER',
        value: '0.2',
        isPrivate: false,
      },
      {
        key: 'defaultTradeFeeRate',
        type: 'NUMBER',
        value: '0.025',
        isPrivate: false,
      },
      {
        key: 'premiumPriceMonthly',
        type: 'NUMBER',
        value: '10',
        isEditable: false,
        isPrivate: false,
      },
      {
        key: 'premiumPriceYearly',
        type: 'NUMBER',
        value: '100',
        isEditable: false,
        isPrivate: false,
      },
      {
        key: 'premiumDiscount',
        type: 'NUMBER',
        value: '0.002',
        isPrivate: false,
      },
    ],
  });

  const defaultTradeFeeRateSetting = await prisma.platformSetting.findUnique({
    where: {
      key: 'defaultTradeFeeRate',
    },
    select: {
      value: true,
    },
  });
  const defaultTradeFeeRate = parseFloat(defaultTradeFeeRateSetting!.value);

  // Create tiers
  const tiers = await prisma.tier.createMany({
    data: [
      {
        name: 'Bronze',
        description:
          'Your starting tier. Earn XP by trading to unlock discounts.',
        level: 0,
        tradingFee: defaultTradeFeeRate,
        discount: 0,
        volume: TIER_VOLUME.BRONZE,
        requiredXP: 0,
      },
      {
        name: 'Silver',
        description:
          'Reach 1,000 XP to move to Silver and enjoy a small discount.',
        level: 1,
        tradingFee: defaultTradeFeeRate,
        discount: 0.05,
        volume: TIER_VOLUME.SILVER,
        requiredXP: 1000,
      },
      {
        name: 'Gold',
        description:
          'When you accumulate 5,000 XP, you qualify for Gold discounts.',
        level: 2,
        tradingFee: defaultTradeFeeRate,
        discount: 0.1,
        volume: TIER_VOLUME.GOLD,
        requiredXP: 2500,
      },
      {
        name: 'Platinum',
        description: 'Achieve 10,000 XP to join our exclusive Platinum tier.',
        level: 3,
        tradingFee: defaultTradeFeeRate,
        discount: 0.15,
        volume: TIER_VOLUME.PLATINUM,
        requiredXP: 5000,
      },
      {
        name: 'Diamond',
        description:
          'Once you hit 20,000 XP you become a Diamond member and get the highest fee discounts.',
        level: 4,
        tradingFee: defaultTradeFeeRate,
        discount: 0.2,
        volume: TIER_VOLUME.DIAMOND,
        requiredXP: 10000,
      },
    ],
  });

  // Create payment method categories and methods
  const paymentMethodCategory = await prisma.paymentMethodCategory.create({
    data: {
      name: 'Bank Transfer',
    },
  });

  const paymentMethods = await prisma.paymentMethod.createMany({
    data: [
      {
        name: 'SEPA',
        paymentMethodCategoryId: paymentMethodCategory.id,
      },
      {
        name: 'SEPA Instant',
        paymentMethodCategoryId: paymentMethodCategory.id,
      },
      {
        name: 'Interac',
        paymentMethodCategoryId: paymentMethodCategory.id,
      },
      {
        name: 'Wire Transfer',
        paymentMethodCategoryId: paymentMethodCategory.id,
      },
      {
        name: 'PIX',
        paymentMethodCategoryId: paymentMethodCategory.id,
      },
    ],
  });

  // Create fiats
  const fiats = await prisma.fiat.createMany({ data: fiatsJson });

  // Create blockchain chains
  const chainData = [
    {
      name: 'Hardhat',
      symbol: 'ETH',
      chainId: 1337,
      rpcUrl: 'http://host.docker.internal:8545',
      explorerUrl: '',
      nativeCurrency: 'ETH',
      isTestnet: true,
      isActive: true,
      description: 'Local Hardhat testnet',
      tempId: 'hardhat-localnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png', // Ethereum
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      chainId: 1,
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_KEY',
      explorerUrl: 'https://etherscan.io',
      nativeCurrency: 'ETH',
      isTestnet: false,
      isActive: true,
      description: 'Ethereum Mainnet',
      tempId: 'eth-mainnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png', // Ethereum
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      chainId: 137,
      rpcUrl: 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
      nativeCurrency: 'MATIC',
      isTestnet: false,
      isActive: true,
      description: 'Polygon Mainnet',
      tempId: 'polygon-mainnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', // Polygon
    },
    {
      name: 'Arbitrum One',
      symbol: 'ARB',
      chainId: 42161,
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      explorerUrl: 'https://arbiscan.io',
      nativeCurrency: 'ETH',
      isTestnet: false,
      isActive: true,
      description: 'Arbitrum One Layer 2',
      tempId: 'arbitrum-one',
      logoUrl:
        'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg', // Arbitrum
    },
    {
      name: 'Base',
      symbol: 'BASE',
      chainId: 8453,
      rpcUrl: 'https://mainnet.base.org',
      explorerUrl: 'https://basescan.org',
      nativeCurrency: 'ETH',
      isTestnet: false,
      isActive: true,
      description: 'Base Layer 2 by Coinbase',
      tempId: 'base-mainnet',
      logoUrl:
        'https://altcoinsbox.com/base-logo-download-coinbase-base-logo.png', // Base
    },
    {
      name: 'Optimism',
      symbol: 'OP',
      chainId: 10,
      rpcUrl: 'https://mainnet.optimism.io',
      explorerUrl: 'https://optimistic.etherscan.io',
      nativeCurrency: 'ETH',
      isTestnet: false,
      isActive: true,
      description: 'Optimism Layer 2',
      tempId: 'optimism-mainnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/25244/large/Optimism.png', // Optimism
    },
    {
      name: 'Sepolia',
      symbol: 'ETH',
      chainId: 11155111,
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
      explorerUrl: 'https://sepolia.etherscan.io',
      nativeCurrency: 'ETH',
      isTestnet: true,
      isActive: true,
      description: 'Ethereum testnet',
      tempId: 'sepolia-testnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png', // Ethereum
    },
    {
      name: 'Amoy',
      symbol: 'MATIC',
      chainId: 80002,
      rpcUrl: 'https://rpc-amoy.polygon.technology',
      explorerUrl: 'https://www.oklink.com/amoy',
      nativeCurrency: 'MATIC',
      isTestnet: true,
      isActive: true,
      description: 'Polygon testnet',
      tempId: 'amoy-testnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', // Polygon
    },
    {
      name: 'Arbitrum Sepolia',
      symbol: 'ETH',
      chainId: 421614,
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      explorerUrl: 'https://sepolia.arbiscan.io',
      nativeCurrency: 'ETH',
      isTestnet: true,
      isActive: true,
      description: 'Arbitrum testnet',
      tempId: 'arbitrum-sepolia-testnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg', // Arbitrum
    },
    {
      name: 'Base Sepolia',
      symbol: 'ETH',
      chainId: 84532,
      rpcUrl: 'https://sepolia.base.org',
      explorerUrl: 'https://sepolia.basescan.org',
      nativeCurrency: 'ETH',
      isTestnet: true,
      isActive: true,
      description: 'Base testnet',
      tempId: 'base-sepolia-testnet',
      logoUrl:
        'https://altcoinsbox.com/base-logo-download-coinbase-base-logo.png', // Base
    },
    {
      name: 'Optimism Sepolia',
      symbol: 'ETH',
      chainId: 11155420,
      rpcUrl: 'https://sepolia.optimism.io',
      explorerUrl: 'https://sepolia-optimism.etherscan.io',
      nativeCurrency: 'ETH',
      isTestnet: true,
      isActive: true,
      description: 'Optimism testnet',
      tempId: 'optimism-sepolia-testnet',
      logoUrl:
        'https://assets.coingecko.com/coins/images/25244/large/Optimism.png', // Optimism
    },
  ];

  await prisma.chain.createMany({
    data: chainData.map(({ tempId, ...rest }) => rest),
  });

  // Create accepted cryptocurrencies
  const acceptedCryptocurrencies =
    await prisma.acceptedCryptocurrency.createMany({
      data: [
        {
          coingeckoId: 'ethereum',
          name: 'Ethereum',
          symbol: 'eth',
        },
        {
          coingeckoId: 'polygon-ecosystem-token',
          name: 'POL (ex-MATIC)',
          symbol: 'pol',
        },
        {
          coingeckoId: 'tether',
          name: 'Tether USD',
          symbol: 'usdt',
        },
        {
          coingeckoId: 'usd-coin',
          name: 'USD Coin',
          symbol: 'usdc',
        },
        {
          id: 'bnb',
          coingeckoId: 'binancecoin',
          name: 'BNB',
          symbol: 'BNB',
        },
      ],
    });

  const cryptocurrencyData = [
    {
      coingeckoId: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image:
        'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    },
    {
      coingeckoId: 'polygon-ecosystem-token',
      name: 'POL (ex-MATIC)',
      symbol: 'POL',
      image:
        'https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684',
    },
    {
      coingeckoId: 'tether',
      name: 'Tether USD',
      symbol: 'USDT',
      image:
        'https://coin-images.coingecko.com/coins/images/325/large/Tether-logo.png?1696501661',
    },
    {
      coingeckoId: 'usd-coin',
      name: 'USD Coin',
      symbol: 'USDC',
      image:
        'https://coin-images.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1696506694',
    },
    {
      coingeckoId: 'wrapped-bitcoin',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      image:
        'https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857',
    },
    {
      coingeckoId: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      image:
        'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696501961',
    },
    {
      coingeckoId: 'uniswap',
      name: 'Uniswap',
      symbol: 'UNI',
      image:
        'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696511246',
    },
    {
      coingeckoId: 'dai',
      name: 'Dai',
      symbol: 'DAI',
      image:
        'https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696510000',
    },
    {
      coingeckoId: 'shiba-inu',
      name: 'Shiba Inu',
      symbol: 'SHIB',
      image:
        'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696510976',
    },
  ];

  await prisma.$transaction(async (tx) => {
    // Create cryptocurrencies
    await tx.cryptocurrency.createMany({
      data: cryptocurrencyData,
    });

    // Fetch the created cryptocurrencies to get their generated IDs
    const createdCryptos = await tx.cryptocurrency.findMany({
      where: {
        coingeckoId: {
          in: cryptocurrencyData.map((c) => c.coingeckoId),
        },
      },
    });

    const cryptoMap = new Map(
      createdCryptos.map((crypto) => [crypto.coingeckoId, crypto.id]),
    );

    // Fetch the created chains to get their generated IDs
    const createdChains = await tx.chain.findMany({
      where: {
        chainId: {
          in: chainData.map((c) => c.chainId),
        },
      },
    });

    const chainMap = new Map(
      createdChains.map((chain) => [
        chainData.find((d) => d.chainId === chain.chainId)?.tempId,
        chain.id,
      ]),
    );

    // Create cryptocurrency-chain relationships
    const cryptocurrencyChainData = [
      // Ethereum native on Hardhat
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('hardhat-localnet')!,
        contractAddress: null,
        isVerified: true,
      },
      // MockUSDC on Hardhat
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('hardhat-localnet')!,
        contractAddress: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
        isVerified: true,
      },
      // Ethereum native on Ethereum
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: null,
        isVerified: true,
      },
      // Ethereum on other chains (wrapped/bridged)
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: null, // Native on Arbitrum
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: null, // Native on Base
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: null, // Native on Optimism
        isVerified: true,
      },

      // POL/MATIC native on Polygon
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x0000000000000000000000000000000000001010',
        isVerified: true,
      },
      // POL on Ethereum (as ERC-20)
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x455e53908408684533026eDA59C4C4C9b7B98F3b',
        isVerified: true,
      },

      // USDT on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        isVerified: true,
      },

      // USDC on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0xA0b86a33E6441947F6Bcf21a1E8AA3e3DdC6e62F',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
        isVerified: true,
      },
      // WBTC on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2E599',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x1BFD67037B42Cf73acf2047067bd442Fc4255c63',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0x2f2a2543B76A4166549F7bffBEfA053D',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x68f180fcCe6836688e9084f0353F3E0a9',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x4200000000000000000000000000000000000006', // Base's native wrapped ETH, using as placeholder for WBTC
        isVerified: true,
      },
      // LINK on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x514910771AF9Ca656af840dff83E8264dCefC6',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0xf97f4df75117a78c1A5a0dbb',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x350a791BfcC2C21F9Ed5dC',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x50c5725949A6F0c72E6C4a641',
        isVerified: true,
      },
      // UNI on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('uniswap')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925bdADdC4201F984',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('uniswap')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('uniswap')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0xFa7F8980b0f1E64A2062791c3b079',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('uniswap')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x68f180fcCe6836688e9084f0353F3E0a9',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('uniswap')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x3352C68262930072A79876000000000000000000',
        isVerified: true,
      },
      // DAI on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('dai')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('dai')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735Fd580221',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('dai')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0xDA10009cBd568aX397C795888',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('dai')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0xDA10009cBd568aX397C795888',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('dai')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x50c5725949A6F0c72E6C4a641',
        isVerified: true,
      },
      // SHIB on multiple chains
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu')!,
        chainId: chainMap.get('eth-mainnet')!,
        contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu')!,
        chainId: chainMap.get('polygon-mainnet')!,
        contractAddress: '0x6f8a06447Ff3A9825f7b45595275C026',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu')!,
        chainId: chainMap.get('arbitrum-one')!,
        contractAddress: '0x6f8a06447Ff3A9825f7b45595275C026',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu')!,
        chainId: chainMap.get('optimism-mainnet')!,
        contractAddress: '0x6f8a06447Ff3A9825f7b45595275C026',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu')!,
        chainId: chainMap.get('base-mainnet')!,
        contractAddress: '0x6f8a06447Ff3A9825f7b45595275C026',
        isVerified: true,
      },
      // Testnet Data
      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('sepolia-testnet')!,
        contractAddress: null, // Native token
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('sepolia-testnet')!,
        contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('sepolia-testnet')!,
        contractAddress: '0xaA8E23Fb4C70490F1d682248DF9C520ada8894E1',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('sepolia-testnet')!,
        contractAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token')!,
        chainId: chainMap.get('amoy-testnet')!,
        contractAddress: null, // Native token
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('amoy-testnet')!,
        contractAddress: '0x41e94Eb019C0762f9BFC4813CE31252235c172c9',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('amoy-testnet')!,
        contractAddress: '0x41e94Eb019C0762f9BFC4813CE31252235c172c9',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('amoy-testnet')!,
        contractAddress: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
        isVerified: true,
      },

      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('arbitrum-sepolia-testnet')!,
        contractAddress: null, // Native token
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('arbitrum-sepolia-testnet')!,
        contractAddress: '0x75faf114e5b4C165553D417535b27361bA6D3C44',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('arbitrum-sepolia-testnet')!,
        contractAddress: '0x75faf114e5b4C165553D417535b27361bA6D3C44',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('arbitrum-sepolia-testnet')!,
        contractAddress: '0xb1d4538B4571d411F07960EF2838Ce337FE1E80E',
        isVerified: true,
      },

      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('base-sepolia-testnet')!,
        contractAddress: null, // Native token
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('base-sepolia-testnet')!,
        contractAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('base-sepolia-testnet')!,
        contractAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('base-sepolia-testnet')!,
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        isVerified: true,
      },

      {
        cryptocurrencyId: cryptoMap.get('ethereum')!,
        chainId: chainMap.get('optimism-sepolia-testnet')!,
        contractAddress: null, // Native token
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('usd-coin')!,
        chainId: chainMap.get('optimism-sepolia-testnet')!,
        contractAddress: '0x59b670e9fA9D0A427751Af201D676719a970857b',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('tether')!,
        chainId: chainMap.get('optimism-sepolia-testnet')!,
        contractAddress: '0x59b670e9fA9D0A427751Af201D676719a970857b',
        isVerified: true,
      },
      {
        cryptocurrencyId: cryptoMap.get('chainlink')!,
        chainId: chainMap.get('optimism-sepolia-testnet')!,
        contractAddress: '0x1622bF67e6e5747b81866FE0b85178a93C7F8892',
        isVerified: true,
      },
    ];
    ('');
    await tx.cryptocurrencyChain.createMany({
      data: cryptocurrencyChainData,
    });

    // Create first trader user
    const traderPassword = 'password';
    const generatedSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(traderPassword, generatedSalt);
    const privateKeysArrObj = await generatePrivateKeysBip39();
    const profileColor = getRandomHighContrastColor();

    const tierBronze = await tx.tier.findFirst({
      where: {
        level: 0,
      },
    });

    const language = await tx.language.upsert({
      where: { name: 'English' },
      update: {},
      create: { name: 'English' },
    });

    const newTrader = await tx.user.create({
      data: {
        firstName: 'Trader',
        lastName: 'Example',
        username: 'trader-example',
        email: 'trade@example.com',
        password: hash,
        privateKeys: privateKeysArrObj.encryptedPrivateKeys,
        profileColor,
        tierId: tierBronze?.id,
        isVerified: true,
      },
    });

    await tx.userLanguage.create({
      data: { languageId: language.id, userId: newTrader.id },
    });

    // Create first vendor user
    const vendorPassword = 'password';
    const vendorGeneratedSalt = await bcrypt.genSalt(10);
    const vendorHash = await bcrypt.hash(vendorPassword, vendorGeneratedSalt);
    const vendorPrivateKeysArrObj = await generatePrivateKeysBip39();
    const vendorProfileColor = getRandomHighContrastColor();

    const vendorTier = await tx.tier.upsert({
      where: {
        name: 'Bronze',
      },
      update: {},
      create: {
        name: 'Bronze',
        description:
          'Your starting tier. Earn XP by trading to unlock discounts',
        level: 0,
        tradingFee: 0.05,
        discount: 0,
        volume: TIER_VOLUME.BRONZE,
        requiredXP: 0,
      },
    });

    const newVendor = await tx.user.create({
      data: {
        firstName: 'Vendor',
        lastName: 'Example',
        username: 'vendor-example',
        email: 'vendor@example.com',
        password: vendorHash,
        privateKeys: vendorPrivateKeysArrObj.encryptedPrivateKeys,
        profileColor: vendorProfileColor,
        tierId: vendorTier.id,
        isVerified: true,
      },
    });

    await tx.userLanguage.create({
      data: { languageId: language.id, userId: newVendor.id },
    });

    // Get references for offer creation
    const crypto = await tx.cryptocurrency.findFirst({
      where: {
        coingeckoId: 'polygon-ecosystem-token',
      },
    });
    const fiat = await tx.fiat.findFirst({
      where: {
        symbol: 'USD',
      },
    });
    const paymentMethod = await tx.paymentMethod.findFirst({
      where: {
        name: 'SEPA',
      },
    });

    const ethChain = await tx.chain.findFirst({
      where: {
        chainId: IS_DEVELOPMENT ? 80002 : 137,
      },
      select: {
        id: true,
      },
    });

    const paymentDetails = await tx.paymentDetails.create({
      data: {
        instructions: 'IBAN: DE28601202008775653297',
        paymentMethodId: paymentMethod!.id,
        userId: newTrader.id,
      },
    });

    // Create first trader offer with chain support
    const newTraderOffer = await tx.offer.create({
      data: {
        instructions: 'Some instructions',
        label: 'ETH/USD Sell Offer',
        tags: ['tags', 'eth', 'test', 'seed', 'ethereum'],
        vendorId: newTrader.id,
        cryptocurrencyId: crypto!.id,
        fiatId: fiat!.id,
        chainId: ethChain!.id,
        limitMax: 1000000,
        limitMin: 1500,
        listAt: 5.6,
        offerType: 'sell',
        paymentDetailsId: paymentDetails.id,
        pricingType: 'market',
        terms: 'Fast and secure ETH trading on Ethereum mainnet',
        timeLimit: 60 * 60,
        vendorWalletAddress: '0x90322b7dfACDBE277d4906C7FA9b5a317CCc2167',
        paymentMethodId: paymentMethod!.id,
      },
    });

    // Create first vendor offer with chain support
    const newVendorOffer = await tx.offer.create({
      data: {
        instructions: 'Professional trading service',
        label: 'ETH/USD Pro Sell',
        tags: ['professional', 'eth', 'verified', 'ethereum'],
        vendorId: newVendor.id,
        cryptocurrencyId: crypto!.id,
        fiatId: fiat!.id,
        chainId: ethChain!.id,
        limitMax: 1000000,
        limitMin: 1500,
        listAt: 5.6,
        offerType: 'sell',
        paymentDetailsId: paymentDetails.id,
        pricingType: 'market',
        terms: 'Professional ETH trading with guaranteed execution',
        timeLimit: 60 * 60,
        vendorWalletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        paymentMethodId: paymentMethod!.id,
      },
    });

    // Create additional offers for different chains and cryptocurrencies
    const polygonChain = await tx.chain.findFirst({
      where: { id: 'polygon-mainnet' },
    });
    const usdtCrypto = await tx.cryptocurrency.findFirst({
      where: { coingeckoId: 'tether' },
    });

    if (polygonChain && usdtCrypto) {
      const polygonOffer = await tx.offer.create({
        data: {
          instructions: 'Fast USDT trading on Polygon',
          label: 'USDT/USD Polygon',
          tags: ['usdt', 'polygon', 'stablecoin', 'low-fees'],
          vendorId: newVendor.id,
          cryptocurrencyId: usdtCrypto.id,
          fiatId: fiat!.id,
          chainId: polygonChain.id,
          limitMax: 50000,
          limitMin: 100,
          listAt: 0.1,
          offerType: 'buy',
          paymentDetailsId: paymentDetails.id,
          pricingType: 'fixed',
          terms: 'Low-cost USDT trading on Polygon network',
          timeLimit: 30 * 60,
          vendorWalletAddress: '0x742d35Cc6634C0532925a3b8D0b4E19f95c3c8c3',
          paymentMethodId: paymentMethod!.id,
        },
      });
    }
  });

  process.exit(0);
};

main().catch(console.error);
