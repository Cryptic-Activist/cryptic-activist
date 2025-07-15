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

    const existingMap = new Map(existingSettings.map((s) => [s.key, s]));

    const incomingKeys = settings.map((s: any) => s.key);

    await prisma.$transaction(async (tx) => {
      // Upsert or update settings
      await Promise.all(
        settings.map(async (setting: any) => {
          const existing = existingMap.get(setting.key);

          const stringValue =
            typeof setting.value === 'boolean'
              ? setting.value.toString()
              : String(setting.value);

          if (existing) {
            // If not editable, skip update
            if (!existing.isEditable) return;

            const nextCanBeDeleted = existing.canBeDeleted
              ? (setting.deletable ?? existing.canBeDeleted)
              : false;

            const nextIsEditable = existing.isEditable
              ? (setting.isEditable ?? existing.isEditable)
              : false;

            await tx.platformSetting.update({
              where: { key: setting.key },
              data: {
                value: stringValue,
                type: setting.type,
                canBeDeleted: nextCanBeDeleted,
                isEditable: nextIsEditable,
              },
            });
          } else {
            // Create new setting
            await tx.platformSetting.create({
              data: {
                key: setting.key,
                value: stringValue,
                type: setting.type,
                canBeDeleted: setting.deletable ?? false,
                isEditable: setting.isEditable ?? true,
                isPrivate: true,
              },
            });
          }
        }),
      );

      // Delete settings not in payload and deletable
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
