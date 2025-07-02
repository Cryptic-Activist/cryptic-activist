import { Request, Response } from 'express';

import { prisma } from '@/services/db/prisma';

export const getChains = async (_req: Request, res: Response) => {
  try {
    const chains = await prisma.chain.findMany();

    res.status(200).send([...chains]);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
