import { Request, Response } from 'express';
import { getCoin, getCoins } from '@/services/coinGecko';

import { fetchGet } from '@/services/axios';
import { filterLongShort } from '@/utils/filters';
import { prisma } from '@/services/db/prisma';

export const index = async (req: Request, res: Response) => {
  try {
    const chainId = req.query.chainId as string;

    const cryptocurrencies = await prisma.cryptocurrency.findMany({
      where: {
        chains: {
          some: {
            chain: {
              chainId: parseInt(chainId),
            },
          },
        },
      },
    });

    res.status(200).json(cryptocurrencies);
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export async function indexCoinGecko(_req: Request, res: Response) {
  try {
    const response = await fetchGet(
      'https://api.coingecko.com/api/v3/coins/list',
    );

    const filtered = filterLongShort(response.data);

    const createdCryptocurrencyMapped = filtered.map(async (cryptocurrency) => {
      const createdCryptocurrency = await prisma.cryptocurrency.create({
        data: {
          coingeckoId: cryptocurrency.id,
          name: cryptocurrency.name,
          symbol: cryptocurrency.symbol,
          image: cryptocurrency.name,
        },
      });

      return createdCryptocurrency;
    });

    const promises = await Promise.all(createdCryptocurrencyMapped);

    res.status(200).json({
      ...promises,
    });
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
}

export const createCryptocurrenciesCoinGecko = async (
  _req: Request,
  res: Response,
) => {
  try {
    const acceptedCryptocurrencies =
      await prisma.acceptedCryptocurrency.findMany();
    const ids = acceptedCryptocurrencies
      .map((accepted) => {
        return accepted.coingeckoId;
      })
      .join(',');
    const coins = await getCoins({
      vs_currency: 'usd',
      ids,
    });
    const mapped = filterLongShort(coins).map(
      ({ id, name, symbol, image }) => ({
        coingeckoId: id,
        name,
        symbol,
        image,
      }),
    );

    const created = await prisma.cryptocurrency.createMany({
      data: mapped,
    });

    res.status(200).json({
      ...created,
    });
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export const createAcceptedCryptocurrencyCoinGecko = async (
  req: Request,
  res: Response,
) => {
  try {
    const { coingeckoId } = req.body;

    const coin = await getCoin(coingeckoId);

    const createdAcceptedCryptocurrency =
      await prisma.acceptedCryptocurrency.create({
        data: {
          coingeckoId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
        },
      });

    res.status(200).json(createdAcceptedCryptocurrency);
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export const getCryptocurrencyFilters = async (
  _req: Request,
  res: Response,
) => {
  try {
    const filters = await prisma.cryptocurrency.findMany({
      select: {
        id: true,
        name: true,
        symbol: true,
      },
    });
    res.status(200).json(filters);
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};

export const getSupportedTokens = async (req: Request, res: Response) => {
  const chainId = req.params.chainId as string;

  const parsedChainId = parseInt(chainId);

  try {
    const filters = await prisma.cryptocurrencyChain.findMany({
      where: {
        chain: {
          chainId: parsedChainId,
        },
      },
      select: {
        chain: true,
        contractAddress: true,
        cryptocurrency: true,
        abiUrl: true,
      },
    });
    res.status(200).json(filters);
  } catch (err) {
    res.status(500).json({
      errors: [err.message],
    });
  }
};
