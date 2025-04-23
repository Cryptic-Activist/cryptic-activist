import { Request, Response } from 'express';

import { redisClient } from '@/services/db/redis';

export const subscribeNotification = async (req: Request, res: Response) => {
  try {
    const { userId, subscription } = req.body;
    await redisClient.hSet(
      'pushSubscriptions',
      userId,
      JSON.stringify(subscription),
    );
    res.sendStatus(201);

    res.status(200).send();
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
