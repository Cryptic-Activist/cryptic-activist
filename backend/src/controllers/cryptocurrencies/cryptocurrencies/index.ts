import {
  createCryptocurrency,
  createManyCryptocurrencies,
  getCryptocurrencies,
} from 'base-ca';
import { Request, Response } from 'express';

import { fetchGet } from '@/services/axios';
import { filterLongShort } from '@/utils/filters/cryptocurrencies';

export const index = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const cryptocurrencies = await getCryptocurrencies();

    return res.status(200).send([...cryptocurrencies]);
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};

export async function indexCoinGecko(
  _req: Request,
  res: Response,
): Promise<Response> {
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

    return res.status(200).send({
      ...promises,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
}

export const createCryptocurrenciesCoinGecko = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await fetchGet(
      'https://api.coingecko.com/api/v3/coins/list',
    );

    const mappped = filterLongShort(response.data).map(
      ({ id, name, symbol }) => ({ coingeckoId: id, name, symbol }),
    );

    const created = await createManyCryptocurrencies(mappped);

    return res.status(200).send({
      ...created,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
};
