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

export const updatePublicPlatformSettings = async (
  req: Request,
  res: Response,
) => {
  try {
    const settings = req.body.settings as unknown as any[];

    const mapped = console.log({ settings });

    const transactions = await prisma.$transaction(async (tx) => {
      const promised = settings.map((setting) => {
        //
      });
      // const settings = await tx.platformSetting.
    });

    const publicSettings = await getPublicSettings();

    res.status(200).send(publicSettings);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
};
