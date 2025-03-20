import { Request, Response } from 'express';
import {
  createAcceptedCryptocurrency,
  createCryptocurrency,
  createManyCryptocurrencies,
  getAcceptedCryptocurrencies,
  getCryptocurrencies,
} from 'base-ca';
import { getCoin, getCoins } from '@/services/coinGecko';

import { fetchGet } from '@/services/axios';
import { filterLongShort } from '@/utils/filters';
import { getQueries } from '@/utils/axios';

export const index = async (_req: Request, res: Response) => {
  try {
    const cryptocurrencies = await getCryptocurrencies({});

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
        where: { id: '' },
        update: {},
        create: {
          coingeckoId: cryptocurrency.id,
          name: cryptocurrency.name,
          symbol: cryptocurrency.symbol,
          image: cryptocurrency.name,
        },
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
    const acceptedCryptocurrencies = await getAcceptedCryptocurrencies({});
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

    const created = await createManyCryptocurrencies(mapped);

    res.status(200).send({
      ...created,
    });
  } catch (err) {
    res.status(500).send({
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

    const createdAcceptedCryptocurrency = await createAcceptedCryptocurrency({
      where: { id: '' },
      update: {},
      create: {
        coingeckoId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
      },
    });

    res.status(200).send(createdAcceptedCryptocurrency);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
