import { Request, Response } from 'express';

import { prisma } from '@/services/db';
import { sanitize } from '@/utils/sanitizer';

// import { sanitizeInputCountBlocks } from '@utils/sanitizer/block';

export async function countBlocked(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await prisma.block.count({
      where: { blockedId: cleanQuery.userId },
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

export async function countBlocker(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await prisma.block.count({
      where: {
        // @ts-ignore
        blockerId: cleanQuery.userId,
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
