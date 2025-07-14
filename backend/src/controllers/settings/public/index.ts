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
    const settings = req.body.settings;

    // Fetch existing public settings
    const existingSettings = await prisma.platformSetting.findMany({
      where: { isPrivate: false },
    });

    const incomingKeys = settings.map((s: any) => s.key);

    await prisma.$transaction(async (tx) => {
      // Upsert all incoming settings
      await Promise.all(
        settings.map((setting: any) => {
          return tx.platformSetting.upsert({
            where: { key: setting.key },
            create: {
              key: setting.key,
              value: setting.value,
              type: setting.type,
              canBeDeleted: setting.deletable,
              isPrivate: false,
            },
            update: {
              value: setting.value,
              type: setting.type,
              canBeDeleted: setting.deletable,
              isPrivate: false,
            },
          });
        }),
      );

      // Delete any public settings not included in the incoming list and canBeDeleted = true
      const keysToDelete = existingSettings
        .filter((s) => !incomingKeys.includes(s.key) && s.canBeDeleted)
        .map((s) => s.key);

      if (keysToDelete.length > 0) {
        await tx.platformSetting.deleteMany({
          where: { key: { in: keysToDelete } },
        });
      }
    });

    const publicSettings = await getPublicSettings();
    res.status(200).send(publicSettings);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: [err.message || 'Internal server error'] });
  }
};
