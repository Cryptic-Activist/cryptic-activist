import { Request, Response } from 'express';

import { countTrusts as crypticBaseCountTrusts } from 'base-ca';
import { sanitize } from 'cryptic-utils';

export async function countTrusts(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await crypticBaseCountTrusts({
      trustedId: cleanQuery.userId,
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
