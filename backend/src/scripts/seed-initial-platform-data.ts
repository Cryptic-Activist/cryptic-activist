import 'dotenv/config';

import bcrypt from 'bcryptjs';
import fiatsJson from '../../fiats.json';
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
};

main().catch(console.error);
