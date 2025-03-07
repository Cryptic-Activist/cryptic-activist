import { Request, Response } from 'express';
import { createFiat, getFiat, getFiats } from 'base-ca';

import fiatsJson from '../../../../fiats.json';

export const index = async (_req: Request, res: Response) => {
  try {
    const fiats = await getFiats();

    res.status(200).send({
      status_code: 200,
      results: fiats,
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};

export const createFiatController = async (req: Request, res: Response) => {
  try {
    const { name, symbol } = req.body;

    const newFiat = await createFiat({
      name,
      symbol,
    });

    res.status(200).send({
      status_code: 200,
      results: newFiat,
    });
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
        name: fiat.name,
        symbol: fiat.symbol,
      });
    });

    res.status(200).send({
      status_code: 200,
    });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
