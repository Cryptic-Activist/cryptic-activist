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

    const existingSettings = await prisma.platformSetting.findMany({
      where: { isPrivate: false },
    });

    const existingMap = new Map(existingSettings.map((s) => [s.key, s]));
    const incomingKeys = settings.map((s: any) => s.key);

    await prisma.$transaction(async (tx) => {
      await Promise.all(
        settings.map(async (setting: any) => {
          const existing = existingMap.get(setting.key);

          const stringValue =
            typeof setting.value === 'boolean'
              ? setting.value.toString()
              : String(setting.value);

          if (existing) {
            // If not editable, skip the update
            if (!existing.isEditable) return;

            // Determine if isEditable should be downgraded
            const nextIsEditable =
              existing.isEditable && setting.isEditable === false
                ? false
                : existing.isEditable;

            // Determine if canBeDeleted should be downgraded
            const nextCanBeDeleted =
              existing.canBeDeleted && setting.deletable === false
                ? false
                : existing.canBeDeleted;

            await tx.platformSetting.update({
              where: { key: setting.key },
              data: {
                value: stringValue,
                type: setting.type,
                isEditable: nextIsEditable,
                canBeDeleted: nextCanBeDeleted,
              },
            });
          } else {
            // New setting — allow full control
            await tx.platformSetting.create({
              data: {
                key: setting.key,
                value: stringValue,
                type: setting.type,
                isEditable: setting.isEditable ?? true,
                canBeDeleted: setting.deletable ?? false,
                isPrivate: false,
              },
            });
          }
        }),
      );

      // Delete keys missing from the payload if they are deletable
      const keysToDelete = existingSettings
        .filter((s) => !incomingKeys.includes(s.key) && s.canBeDeleted)
        .map((s) => s.key);

      if (keysToDelete.length > 0) {
        await tx.platformSetting.deleteMany({
          where: { key: { in: keysToDelete } },
        });
      }
    });

    const publicSettings = await prisma.platformSetting.findMany({
      where: { isPrivate: false },
    });

    res.status(200).json(publicSettings);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: [err.message || 'Internal server error'] });
  }
};
