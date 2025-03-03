import { countTrusts as crypticBaseCountTrusts } from 'base-ca';
import { sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function countTrusts(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await crypticBaseCountTrusts({
      trustedId: cleanQuery.userId,
    });

    return res.status(200).send({
      count,
    });
  } catch (err) {
    return res.status(500).send({
      errors: [err.message],
    });
  }
}
