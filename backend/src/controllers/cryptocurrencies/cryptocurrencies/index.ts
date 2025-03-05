import { Request, Response } from 'express';
import {
  createCryptocurrency,
  createManyCryptocurrencies,
  getCryptocurrencies,
} from 'base-ca';

import { fetchGet } from '@/services/axios';
import { filterLongShort } from '@/utils/filters';

export const index = async (_req: Request, res: Response) => {
  try {
    const cryptocurrencies = await getCryptocurrencies();

    res.status(200).send([...cryptocurrencies]);
  } catch (err) {
    res.status(500).send({
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
      const createdCryptocurrency = await createCryptocurrency({
        coingeckoId: cryptocurrency.id,
        name: cryptocurrency.name,
        symbol: cryptocurrency.symbol,
      });

      return createdCryptocurrency;
    });

    const promises = await Promise.all(createdCryptocurrencyMapped);

    res.status(200).send({
      ...promises,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const createCryptocurrenciesCoinGecko = async (
  _req: Request,
  res: Response,
) => {
  try {
    const response = await fetchGet(
      'https://api.coingecko.com/api/v3/coins/list',
    );

    const mappped = filterLongShort(response.data).map(
      ({ id, name, symbol }) => ({ coingeckoId: id, name, symbol }),
    );

    const created = await createManyCryptocurrencies(mappped);

    res.status(200).send({
      ...created,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
