import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export const getSystemMessagesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    const systemMessages = await prisma.systemMessage.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).send(systemMessages);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
