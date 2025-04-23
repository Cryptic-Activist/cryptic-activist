import { Request, Response } from 'express';

import { prisma } from '@/services/db';
import { sanitize } from '@/utils/sanitizer';

export async function countTrusts(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await prisma.trust.count({
      where: {
        trustedId: cleanQuery.userId,
      },
    });

    res.status(200).send({
      count,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}
