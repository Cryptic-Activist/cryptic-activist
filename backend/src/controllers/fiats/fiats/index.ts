import { Request, Response } from 'express';
import { cacheData, getCachedData } from '@/services/db/redis/cache';

import fiatsJson from '../../../../fiats.json';
import { prisma } from '@/services/db/prisma';

export const index = async (_req: Request, res: Response) => {
  try {
    const cachedFiats = await getCachedData('fiats');

    if (!cachedFiats) {
      const fiats = await prisma.fiat.findMany({
        orderBy: {
          name: 'desc',
        },
      });

      await cacheData({
        cacheKey: 'fiats',
        data: fiats,
        expiry: '12M',
      });

      res.status(200).json(fiats);
      return;
    }

    res.status(200).json(cachedFiats);
  } catch (err) {
    res.status(500).json({
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
