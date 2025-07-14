import { Request, Response } from 'express';

import { getPrivateSettings } from '@/utils/settings';
import { prisma } from '@/services/db';

export const getPrivatePlatformSettings = async (
  _req: Request,
  res: Response,
) => {
  try {
    const privateSettings = await getPrivateSettings();

    res.status(200).send(privateSettings);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      errors: [err.message],
    });
  }
};

export const updatePrivatePlatformSettings = async (
  req: Request,
  res: Response,
) => {
  try {
    const settings = req.body.settings;

    console.log({ settings });

    const existingSettings = await prisma.platformSetting.findMany({
      where: { isPrivate: true },
    });

    const incomingKeys = settings.map((s: any) => s.key);

    await prisma.$transaction(async (tx) => {
      // Upsert incoming settings
      await Promise.all(
        settings.map((setting: any) => {
          // Ensure value is stored as a string
          const stringValue =
            typeof setting.value === 'boolean'
              ? setting.value.toString()
              : String(setting.value);

          return tx.platformSetting.upsert({
            where: { key: setting.key },
            create: {
              key: setting.key,
              value: stringValue,
              type: setting.type,
              canBeDeleted: setting.deletable,
              isPrivate: true,
            },
            update: {
              value: stringValue,
              type: setting.type,
              canBeDeleted: setting.deletable,
              isPrivate: true,
            },
          });
        }),
      );

      // Delete settings not included in payload, if deletable
      const keysToDelete = existingSettings
        .filter((s) => !incomingKeys.includes(s.key) && s.canBeDeleted)
        .map((s) => s.key);

      if (keysToDelete.length > 0) {
        await tx.platformSetting.deleteMany({
          where: {
            key: { in: keysToDelete },
          },
        });
      }
    });

    const privateSettings = await prisma.platformSetting.findMany({
      where: { isPrivate: true },
    });

    res.status(200).json(privateSettings);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: [err.message || 'Internal server error'] });
  }
};
