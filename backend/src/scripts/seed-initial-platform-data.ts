import 'dotenv/config';

import bcrypt from 'bcryptjs';
import fiatsJson from '../../fiats.json';
import { generatePrivateKeysBip39 } from '@/utils/privateKeys';
import { getCoinPrice } from '@/services/coinGecko';
import { getPrice } from '@/controllers/cryptocurrencies';
import { getRandomHighContrastColor } from '@/utils/color';
import { prisma } from '../services/db';

const main = async () => {
  // Create tiers
  const tiers = await prisma.tier.createMany({
    data: [
      {
        name: 'Bronze',
        description:
          'Your starting tier. Earn XP by trading to unlock discounts.',
        level: 0,
        tradingFee: 0.05,
        discount: 0,
        minVolume: 0,
        requiredXP: 0,
      },
      {
        name: 'Silver',
        description:
          'Reach 1,000 XP to move to Silver and enjoy a small discount.',
        level: 1,
        tradingFee: 0.05,
        discount: 0.05,
        minVolume: 0,
        requiredXP: 1000,
      },
      {
        name: 'Gold',
        description:
          'When you accumulate 5,000 XP, you qualify for Gold discounts.',
        level: 2,
        tradingFee: 0.05,
        discount: 0.1,
        minVolume: 0,
        requiredXP: 2500,
      },
      {
        name: 'Platinum',
        description: 'Achieve 10,000 XPto join our exclusive Platinum tier.',
        level: 3,
        tradingFee: 0.05,
        discount: 0.15,
        minVolume: 0,
        requiredXP: 5000,
      },
      {
        name: 'Diamond',
        description:
          'Once you hit 20,000 XP you become a Diamond member and get the highest fee discounts.',
        level: 4,
        tradingFee: 0.05,
        discount: 0.2,
        minVolume: 0,
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
  const chains = await prisma.chain.createMany({
    data: [
      {
        id: 'eth-mainnet',
        name: 'Ethereum',
        symbol: 'ETH',
        chainId: 1,
        rpcUrl: 'https://mainnet.infura.io/v3/YOUR_KEY',
        explorerUrl: 'https://etherscan.io',
        nativeCurrency: 'ETH',
        isTestnet: false,
        isActive: true,
        description: 'Ethereum Mainnet',
      },
      {
        id: 'polygon-mainnet',
        name: 'Polygon',
        symbol: 'MATIC',
        chainId: 137,
        rpcUrl: 'https://polygon-rpc.com',
        explorerUrl: 'https://polygonscan.com',
        nativeCurrency: 'MATIC',
        isTestnet: false,
        isActive: true,
        description: 'Polygon Mainnet',
      },
      {
        id: 'arbitrum-one',
        name: 'Arbitrum One',
        symbol: 'ARB',
        chainId: 42161,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        explorerUrl: 'https://arbiscan.io',
        nativeCurrency: 'ETH',
        isTestnet: false,
        isActive: true,
        description: 'Arbitrum One Layer 2',
      },
      {
        id: 'base-mainnet',
        name: 'Base',
        symbol: 'BASE',
        chainId: 8453,
        rpcUrl: 'https://mainnet.base.org',
        explorerUrl: 'https://basescan.org',
        nativeCurrency: 'ETH',
        isTestnet: false,
        isActive: true,
        description: 'Base Layer 2 by Coinbase',
      },
      {
        id: 'optimism-mainnet',
        name: 'Optimism',
        symbol: 'OP',
        chainId: 10,
        rpcUrl: 'https://mainnet.optimism.io',
        explorerUrl: 'https://optimistic.etherscan.io',
        nativeCurrency: 'ETH',
        isTestnet: false,
        isActive: true,
        description: 'Optimism Layer 2',
      },
      {
        id: 'bsc-mainnet',
        name: 'BNB Smart Chain',
        symbol: 'BNB',
        chainId: 56,
        rpcUrl: 'https://bsc-dataseed.binance.org',
        explorerUrl: 'https://bscscan.com',
        nativeCurrency: 'BNB',
        isTestnet: false,
        isActive: true,
        description: 'BNB Smart Chain',
      },
    ],
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

  // Create cryptocurrencies (contract addresses will be stored in CryptocurrencyChain junction table)
  const cryptocurrencies = await prisma.cryptocurrency.createMany({
    data: [
      {
        id: 'eth',
        coingeckoId: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        image:
          'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      },
      {
        id: 'pol',
        coingeckoId: 'polygon-ecosystem-token',
        name: 'POL (ex-MATIC)',
        symbol: 'POL',
        image:
          'https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684',
      },
      {
        id: 'usdt',
        coingeckoId: 'tether',
        name: 'Tether USD',
        symbol: 'USDT',
        image:
          'https://coin-images.coingecko.com/coins/images/325/large/Tether-logo.png?1696501661',
      },
      {
        id: 'usdc',
        coingeckoId: 'usd-coin',
        name: 'USD Coin',
        symbol: 'USDC',
        image:
          'https://coin-images.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1696506694',
      },
      {
        id: 'bnb',
        coingeckoId: 'binancecoin',
        name: 'BNB',
        symbol: 'BNB',
        image:
          'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
      },
    ],
  });

  // Create cryptocurrency-chain relationships
  const cryptocurrencyChains = await prisma.cryptocurrencyChain.createMany({
    data: [
      // Ethereum native on Ethereum
      {
        cryptocurrencyId: 'eth',
        chainId: 'eth-mainnet',
        contractAddress: null,
        isVerified: true,
      },
      // Ethereum on other chains (wrapped/bridged)
      {
        cryptocurrencyId: 'eth',
        chainId: 'polygon-mainnet',
        contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'eth',
        chainId: 'arbitrum-one',
        contractAddress: null, // Native on Arbitrum
        isVerified: true,
      },
      {
        cryptocurrencyId: 'eth',
        chainId: 'base-mainnet',
        contractAddress: null, // Native on Base
        isVerified: true,
      },
      {
        cryptocurrencyId: 'eth',
        chainId: 'optimism-mainnet',
        contractAddress: null, // Native on Optimism
        isVerified: true,
      },

      // POL/MATIC native on Polygon
      {
        cryptocurrencyId: 'pol',
        chainId: 'polygon-mainnet',
        contractAddress: null,
        isVerified: true,
      },
      // POL on Ethereum (as ERC-20)
      {
        cryptocurrencyId: 'pol',
        chainId: 'eth-mainnet',
        contractAddress: '0x455e53908408684533026eDA59C4C4C9b7B98F3b',
        isVerified: true,
      },

      // USDT on multiple chains
      {
        cryptocurrencyId: 'usdt',
        chainId: 'eth-mainnet',
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdt',
        chainId: 'polygon-mainnet',
        contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdt',
        chainId: 'arbitrum-one',
        contractAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdt',
        chainId: 'bsc-mainnet',
        contractAddress: '0x55d398326f99059fF775485246999027B3197955',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdt',
        chainId: 'optimism-mainnet',
        contractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        isVerified: true,
      },

      // USDC on multiple chains
      {
        cryptocurrencyId: 'usdc',
        chainId: 'eth-mainnet',
        contractAddress: '0xA0b86a33E6441947F6Bcf21a1E8AA3e3DdC6e62F',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdc',
        chainId: 'polygon-mainnet',
        contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdc',
        chainId: 'arbitrum-one',
        contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdc',
        chainId: 'base-mainnet',
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        isVerified: true,
      },
      {
        cryptocurrencyId: 'usdc',
        chainId: 'optimism-mainnet',
        contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
        isVerified: true,
      },

      // BNB native on BSC
      {
        cryptocurrencyId: 'bnb',
        chainId: 'bsc-mainnet',
        contractAddress: null,
        isVerified: true,
      },
    ],
  });

  // Create first trader user
  const traderPassword = 'password';
  const generatedSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(traderPassword, generatedSalt);
  const privateKeysArrObj = await generatePrivateKeysBip39();
  const profileColor = getRandomHighContrastColor();

  const tierBronze = await prisma.tier.findFirst({
    where: {
      level: 0,
    },
  });

  const newTrader = await prisma.user.create({
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

  // Create first vendor user
  const vendorPassword = 'password';
  const vendorGeneratedSalt = await bcrypt.genSalt(10);
  const vendorHash = await bcrypt.hash(vendorPassword, vendorGeneratedSalt);
  const vendorPrivateKeysArrObj = await generatePrivateKeysBip39();
  const vendorProfileColor = getRandomHighContrastColor();

  const vendorTier = await prisma.tier.upsert({
    where: {
      name: 'Bronze',
    },
    update: {},
    create: {
      name: 'Bronze',
      description: 'Your starting tier. Earn XP by trading to unlock discounts',
      level: 0,
      tradingFee: 0.05,
      discount: 0,
      minVolume: 0,
      requiredXP: 0,
    },
  });

  const newVendor = await prisma.user.create({
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

  // Get references for offer creation
  const crypto = await prisma.cryptocurrency.findFirst({
    where: {
      coingeckoId: 'ethereum',
    },
  });
  const fiat = await prisma.fiat.findFirst({
    where: {
      symbol: 'USD',
    },
  });
  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: {
      name: 'SEPA',
    },
  });
  const ethChain = await prisma.chain.findFirst({
    where: {
      id: 'eth-mainnet',
    },
  });

  const paymentDetails = await prisma.paymentDetails.create({
    data: {
      instructions: 'IBAN: DE28601202008775653297',
      paymentMethodId: paymentMethod!.id,
      userId: newTrader.id,
    },
  });

  // Create first trader offer with chain support
  const newTraderOffer = await prisma.offer.create({
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
  const newVendorOffer = await prisma.offer.create({
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
  const polygonChain = await prisma.chain.findFirst({
    where: { id: 'polygon-mainnet' },
  });
  const usdtCrypto = await prisma.cryptocurrency.findFirst({
    where: { coingeckoId: 'tether' },
  });

  if (polygonChain && usdtCrypto) {
    const polygonOffer = await prisma.offer.create({
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

  console.log({
    newTrader,
    newVendor,
    newTraderOffer,
    newVendorOffer,
    chainsCreated: 6,
    cryptocurrenciesCreated: 5,
    cryptocurrencyChainRelations: 16,
  });

  process.exit(0);
};

main().catch(console.error);
