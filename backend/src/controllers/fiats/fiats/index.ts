import { Request, Response } from 'express';

import fiatsJson from '../../../../fiats.json';
import { prisma } from '@/services/db/prisma';

export const index = async (_req: Request, res: Response) => {
  try {
    const fiats = await prisma.fiat.findMany({
      orderBy: {
        name: 'desc',
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

    const newFiat = await prisma.fiat.create({
      data: {
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
    await prisma.fiat.createMany({ data: fiatsJson });

    res.status(200).send({ ok: true });
  } catch (err) {
    res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
