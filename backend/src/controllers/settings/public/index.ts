import { Request, Response } from 'express';

import { getPublicSettings } from '@/utils/settings';
import { prisma } from '@/services/db';

export const getPublicPlatformSettings = async (
  _req: Request,
  res: Response,
) => {
  try {
    const publicSettings = await getPublicSettings();

    res.status(200).send(publicSettings);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
};
