import { Request, Response } from 'express';

import { prisma } from '@/services/db';

export const getFeedbacksByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const feedbacks = await prisma.feedback.findMany({
      where: {
        trade: {
          vendorId: userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        message: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        trader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profileColor: true,
          },
        },
      },
    });

    res.status(200).send(feedbacks);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
