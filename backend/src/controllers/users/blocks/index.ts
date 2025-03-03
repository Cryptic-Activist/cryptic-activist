import { countBlocks } from 'base-ca';
import { sanitize } from 'cryptic-utils';
import { Request, Response } from 'express';

// import { sanitizeInputCountBlocks } from '@utils/sanitizer/block';

export async function countBlocked(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await countBlocks({
      blockedId: cleanQuery.userId,
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

export async function countBlocker(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { userId } = req.query;

    const cleanQuery = sanitize({ userId }, []);

    const count = await countBlocks({
      // @ts-ignore
      blockerId: cleanQuery.userId,
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
