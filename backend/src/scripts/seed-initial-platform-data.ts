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
      coingeckoId: 'shiba-inu',
      name: 'Shiba Inu',
      symbol: 'SHIB',
      image:
        'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696510976',
    },
    {
      coingeckoId: 'aave',
      name: 'Aave',
      symbol: 'AAVE',
      image:
        'https://coin-images.coingecko.com/coins/images/12645/large/aave.png?1696512451',
    },
    {
      coingeckoId: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      image:
        'https://coin-images.coingecko.com/coins/images/16547/large/arbitrum.png?1696515678',
    },
    {
      coingeckoId: 'render-token',
      name: 'Render Token',
      symbol: 'RNDR',
      image:
        'https://coin-images.coingecko.com/coins/images/11636/large/rndr.png?1696511529',
    },
    {
      coingeckoId: 'immutable-x',
      name: 'Immutable X',
      symbol: 'IMX',
      image:
        'https://coin-images.coingecko.com/coins/images/17233/large/imx.png?1696516668',
    },
    {
      coingeckoId: 'lido-dao',
      name: 'Lido DAO',
      symbol: 'LDO',
      image:
        'https://coin-images.coingecko.com/coins/images/13573/large/lido.png?1696513326',
    },
    {
      coingeckoId: 'curve-dao-token',
      name: 'Curve DAO Token',
      symbol: 'CRV',
      image:
        'https://coin-images.coingecko.com/coins/images/12124/large/curve.png?1696511967',
    },
    {
      coingeckoId: 'nexo',
      name: 'Nexo',
      symbol: 'NEXO',
      image:
        'https://coin-images.coingecko.com/coins/images/3695/large/nexo.png?1696504363',
    },
    {
      coingeckoId: 'pancakeswap',
      name: 'PancakeSwap',
      symbol: 'CAKE',
      image:
        'https://coin-images.coingecko.com/coins/images/12632/large/pancakeswap.png?1696512440',
    },
    {
      coingeckoId: 'sushi',
      name: 'SushiSwap',
      symbol: 'SUSHI',
      image:
        'https://coin-images.coingecko.com/coins/images/12271/large/sushi.png?1696512100',
    },
    {
      coingeckoId: 'optimism',
      name: 'Optimism',
      symbol: 'OP',
      image:
        'https://coin-images.coingecko.com/coins/images/25244/large/optimism.png?1696524385',
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
      // Ethereum native on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('ethereum'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: null,
        isVerified: true,
      },
      // POL on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
        isVerified: true,
      },
      // USDT on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        isVerified: true,
      },
      // USDC on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        isVerified: true,
      },
      // WBTC on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('wrapped-bitcoin'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        isVerified: true,
      },
      // LINK on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        isVerified: true,
      },
      // UNI on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('uniswap'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        isVerified: true,
      },
      // SHIB on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('shiba-inu'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
        isVerified: true,
      },
      // AAVE on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('aave'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        isVerified: true,
      },
      // ARB on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('arbitrum'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1',
        isVerified: true,
      },
      // RNDR on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('render-token'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24',
        isVerified: true,
      },
      // IMX on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('immutable-x'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF',
        isVerified: true,
      },
      // LDO on Ethereum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('lido-dao'),
        chainId: chainMap.get('eth-mainnet'),
        contractAddress: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
        isVerified: true,
      },
      // POL native on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0x0000000000000000000000000000000000001010',
        isVerified: true,
      },
      // USDC on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        isVerified: true,
      },
      // USDT on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        isVerified: true,
      },
      // LINK on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
        isVerified: true,
      },
      // UNI on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('uniswap'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
        isVerified: true,
      },
      // AAVE on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('aave'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
        isVerified: true,
      },
      // CRV on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('curve-dao-token'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
        isVerified: true,
      },
      // NEXO on Polygon Mainnet
      {
        cryptocurrencyId: cryptoMap.get('nexo'),
        chainId: chainMap.get('polygon-mainnet'),
        contractAddress: '0x41b3966B4FF7b427969ddf5da3627d6AEAE9a48E',
        isVerified: true,
      },
      // ARB native on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('arbitrum'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
        isVerified: true,
      },
      // USDC on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        isVerified: true,
      },
      // LINK on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
        isVerified: true,
      },
      // UNI on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('uniswap'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
        isVerified: true,
      },
      // AAVE on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('aave'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
        isVerified: true,
      },
      // CRV on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('curve-dao-token'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
        isVerified: true,
      },
      // CAKE on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('pancakeswap'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c',
        isVerified: true,
      },
      // SUSHI on Arbitrum Mainnet
      {
        cryptocurrencyId: cryptoMap.get('sushi'),
        chainId: chainMap.get('arbitrum-one'),
        contractAddress: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
        isVerified: true,
      },
      // OP native on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('optimism'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0x4200000000000000000000000000000000000042',
        isVerified: true,
      },
      // USDC on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
        isVerified: true,
      },
      // LINK on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
        isVerified: true,
      },
      // CRV on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('curve-dao-token'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53',
        isVerified: true,
      },
      // LDO on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('lido-dao'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0xFdb794692724153d1488CcdBE0C56c252596735F',
        isVerified: true,
      },
      // UNI on Optimism Mainnet
      {
        cryptocurrencyId: cryptoMap.get('uniswap'),
        chainId: chainMap.get('optimism-mainnet'),
        contractAddress: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
        isVerified: true,
      },
      // Ethereum native on Sepolia
      {
        cryptocurrencyId: cryptoMap.get('ethereum'),
        chainId: chainMap.get('sepolia-testnet'),
        contractAddress: null,
        isVerified: true,
      },
      // USDC on Sepolia
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('sepolia-testnet'),
        contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        isVerified: true,
      },
      // USDT on Sepolia
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('sepolia-testnet'),
        contractAddress: '0xaA8E23Fb4C70490F1d1d38f3CE4aC3a91BF4f8d6',
        isVerified: true,
      },
      // LINK on Sepolia
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('sepolia-testnet'),
        contractAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
        isVerified: true,
      },
      // POL native on Amoy
      {
        cryptocurrencyId: cryptoMap.get('polygon-ecosystem-token'),
        chainId: chainMap.get('amoy-testnet'),
        contractAddress: '0x0000000000000000000000000000000000001010',
        isVerified: true,
      },
      // USDC on Amoy
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('amoy-testnet'),
        contractAddress: '0x41E94Eb019C0762f9BFCf9Fb1C3F2A4BDE9cF3b3',
        isVerified: true,
      },
      // USDT on Amoy
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('amoy-testnet'),
        contractAddress: '0xF3A5f0b3B7f9F9c7E4cF1A2D9bA3D3D6E3cF9A1E',
        isVerified: true,
      },
      // LINK on Amoy
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('amoy-testnet'),
        contractAddress: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
        isVerified: true,
      },
      // Ethereum native on Arbitrum Sepolia
      {
        cryptocurrencyId: cryptoMap.get('ethereum'),
        chainId: chainMap.get('arbitrum-sepolia-testnet'),
        contractAddress: null,
        isVerified: true,
      },
      // USDC on Arbitrum Sepolia
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('arbitrum-sepolia-testnet'),
        contractAddress: '0x75faf114eafb1BDbe6EF2B5aF9DD00806f533B00',
        isVerified: true,
      },
      // USDT on Arbitrum Sepolia
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('arbitrum-sepolia-testnet'),
        contractAddress: '0x2B3F838B7D6C5B6c1a8bF3D6D6e2F5B7A9eD9e4B',
        isVerified: true,
      },
      // LINK on Arbitrum Sepolia
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('arbitrum-sepolia-testnet'),
        contractAddress: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E',
        isVerified: true,
      },
      // Ethereum native on Optimism Sepolia
      {
        cryptocurrencyId: cryptoMap.get('ethereum'),
        chainId: chainMap.get('optimism-sepolia-testnet'),
        contractAddress: null,
        isVerified: true,
      },
      // USDC on Optimism Sepolia
      {
        cryptocurrencyId: cryptoMap.get('usd-coin'),
        chainId: chainMap.get('optimism-sepolia-testnet'),
        contractAddress: '0x5fd84259d66Cd3FF6Ec2Bdb64A44F26F4B85F17C',
        isVerified: true,
      },
      // USDT on Optimism Sepolia
      {
        cryptocurrencyId: cryptoMap.get('tether'),
        chainId: chainMap.get('optimism-sepolia-testnet'),
        contractAddress: '0x9C2b7188d6f1B6a2E9cE8C8e6A6D6E1B6C6E6D6B',
        isVerified: true,
      },
      // LINK on Optimism Sepolia
      {
        cryptocurrencyId: cryptoMap.get('chainlink'),
        chainId: chainMap.get('optimism-sepolia-testnet'),
        contractAddress: '0x1622bF67e6e5747b81866FE0b85178a93C7F86b6',
        isVerified: true,
      },
    ];

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
