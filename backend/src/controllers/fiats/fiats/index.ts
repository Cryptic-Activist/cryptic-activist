import { Request, Response } from 'express';
import { createFiat, getFiats } from 'base-ca';

import fiatsJson from '../../../../fiats.json';

export const index = async (_req: Request, res: Response) => {
  try {
    const fiats = await getFiats({
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).send(fiats);
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};

export const createFiatController = async (req: Request, res: Response) => {
  try {
    const { name, symbol, country } = req.body;

    const newFiat = await createFiat({
      where: { id: '' },
      update: {},
      create: {
        name,
        symbol,
        country,
      },
    });

    res.status(200).send(newFiat);
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};

export const createFiatsJSON = async (_req: Request, res: Response) => {
  try {
    fiatsJson.forEach(async (fiat) => {
      await createFiat({
        where: { id: '' },
        update: {},
        create: {
          name: fiat.name,
          symbol: fiat.symbol,
          country: fiat.country,
        },
      });
    });

    res.status(200).send({ ok: true });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
