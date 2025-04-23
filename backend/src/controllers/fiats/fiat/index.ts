import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';

export const getFiatController = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const { fiatSymbol } = query;
    const fiat = await prisma.fiat.findFirst({
      where: {
        // @ts-ignore
        symbol: fiatSymbol,
      },
    });

    res.status(200).send({
      id: fiat?.id,
      symbol: fiat?.symbol,
      name: fiat?.name,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
