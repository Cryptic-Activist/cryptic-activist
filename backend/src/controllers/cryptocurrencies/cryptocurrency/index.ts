import { createCryptocurrency, getCryptocurrency } from 'base-ca';
import { Request, Response } from 'express';

import { fetchGet } from '@/services/axios';
import { getCoinPrice } from '@/services/coinGecko';

export const getPrice = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const { id, fiatSymbol } = query;

    // @ts-ignore
    const price = await getCoinPrice(id, fiatSymbol);
    // @ts-ignore
    if (price && price[id] && Object.entries(price[id]).length > 0) {
      return res.status(200).send({
        ...price,
      });
    }

    return res.status(400).send({
      errors: ['Cryptocurrency not found.'],
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};

export const getCryptocurrencyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { cryptocurrencySymbol } = req.query;

    const crypto = await getCryptocurrency({
      // @ts-ignore
      coingeckoId: cryptocurrencySymbol,
    });

    if (!crypto) {
      return res.status(400).send({
        errors: ['Coin does not exist!'],
      });
    }

    return res.status(200).send({
      coingeckoId: crypto.coingeckoId,
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};

export const createCryptocurrencyCoinGecko = async (
  req: Request,
  res: Response,
) => {
  try {
    const { coingeckoId } = req.body;

    const response = await fetchGet(
      `https://api.coingecko.com/api/v3/coins/${coingeckoId}`,
    );

    if (response.status !== 200) {
      return res.status(400).send({
        errors: ["Couldn't fetch cryptocurrency information"],
      });
    }

    const newCrypto = await createCryptocurrency({
      name: response.data.name,
      symbol: response.data.symbol.toUpperCase(),
      coingeckoId: response.data.id,
    });

    if (!newCrypto) {
      return res.status(400).send({
        errors: ['Coin already exists!'],
      });
    }

    return res.status(200).send({
      ...newCrypto,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};
