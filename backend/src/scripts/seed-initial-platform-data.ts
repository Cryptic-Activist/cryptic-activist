import 'dotenv/config';

import bcrypt from 'bcryptjs';
import fiatsJson from '../../fiats.json';
import { generatePrivateKeysBip39 } from '@/utils/privateKeys';
import { getCoinPrice } from '@/services/coinGecko';
import { getPrice } from '@/controllers/cryptocurrencies';
import { getRandomHighContrastColor } from '@/utils/color';
import { prisma } from '../services/db';

const main = async () => {
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
  const fiats = await prisma.fiat.createMany({ data: fiatsJson });
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
      ],
    });
  const cryptocurrencies = await prisma.cryptocurrency.createMany({
    data: [
      {
        coingeckoId: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        image:
          'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      },
      {
        coingeckoId: 'polygon-ecosystem-token',
        name: 'POL (ex-MATIC)',
        symbol: 'pol',
        image:
          'https://coin-images.coingecko.com/coins/images/32440/large/polygon.png?1698233684',
      },
    ],
  });

  // Create first trader user
  const traderPassword = 'password';
  const generatedSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(traderPassword, generatedSalt);
  const privateKeysArrObj = await generatePrivateKeysBip39();
  const profileColor = getRandomHighContrastColor();

  const tier = await prisma.tier.upsert({
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

  const newTrader = await prisma.user.create({
    data: {
      firstName: 'Trader',
      lastName: 'Example',
      username: 'trader-example',
      email: 'trade@example.com',
      password: hash,
      privateKeys: privateKeysArrObj.encryptedPrivateKeys,
      profileColor,
      tierId: tier.id,
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

  const paymentDetails = await prisma.paymentDetails.create({
    data: {
      instructions: 'IBAN: DE28601202008775653297',
      paymentMethodId: paymentMethod!.id,
      userId: newTrader.id,
    },
  });

  // Create first trader offer
  const newTraderOffer = await prisma.offer.create({
    data: {
      instructions: 'Some instructions',
      label: 'Some Label',
      tags: ['tags', 'eth', 'test', 'seed'],
      vendorId: newTrader.id,
      cryptocurrencyId: crypto!.id,
      fiatId: fiat!.id,
      limitMax: 1000000,
      limitMin: 1500,
      listAt: 5.6,
      offerType: 'sell',
      paymentDetailsId: paymentDetails.id,
      pricingType: 'market',
      terms: 'Some Terms',
      timeLimit: 60 * 60,
      vendorWalletAddress: '0x90322b7dfACDBE277d4906C7FA9b5a317CCc2167',
      paymentMethodId: paymentMethod!.id,
    },
  });

  // Create first vendor offer
  const newVendorOffer = await prisma.offer.create({
    data: {
      instructions: 'Some instructions',
      label: 'Some Label',
      tags: ['tags', 'eth', 'test', 'seed'],
      vendorId: newVendor.id,
      cryptocurrencyId: crypto!.id,
      fiatId: fiat!.id,
      limitMax: 1000000,
      limitMin: 1500,
      listAt: 5.6,
      offerType: 'sell',
      paymentDetailsId: paymentDetails.id,
      pricingType: 'market',
      terms: 'Some Terms',
      timeLimit: 60 * 60,
      vendorWalletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      paymentMethodId: paymentMethod!.id,
    },
  });

  console.log({ newTrader, newVendor, newTraderOffer, newVendorOffer });
  process.exit(0);
};

main().catch(console.error);
