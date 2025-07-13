import { Request, Response } from 'express';
import { getPrivateSettings, getPublicSettings } from '@/utils/settings';

import { prisma } from '@/services/db';

export const getPlatformSettings = async (_req: Request, res: Response) => {
  try {
    const publicSettings = await prisma.platformSetting.findMany({
      where: {
        isPrivate: false,
      },
      select: {
        key: true,
        value: true,
        type: true,
        canBeDeleted: true,
      },
    });
    const privateSettings = await prisma.platformSetting.findMany({
      where: {
        isPrivate: true,
      },
      select: {
        key: true,
        value: true,
        type: true,
        canBeDeleted: true,
      },
    });

    res.status(200).send({
      public: publicSettings,
      private: privateSettings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
};
