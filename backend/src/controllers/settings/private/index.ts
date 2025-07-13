import { Request, Response } from 'express';

import { getPrivateSettings } from '@/utils/settings';

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
