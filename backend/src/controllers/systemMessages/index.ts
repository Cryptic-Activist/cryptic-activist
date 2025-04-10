import { Request, Response } from 'express';

import { getSystemMessages } from 'base-ca';

export const getSystemMessagesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    const systemMessages = await getSystemMessages({
      where: {
        userId,
      },
    });

    res.status(200).send(systemMessages);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
