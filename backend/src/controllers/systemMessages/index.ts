import { Request, Response } from 'express';

import { filtersType } from './data';
import { prisma } from '@/services/db';

export const getSystemMessagesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const type = req.query.type as string;

    const [systemMessages, totalCount] = await Promise.all([
      prisma.systemMessage.findMany({
        where: {
          userId,
          ...(type && {
            type: {
              in: filtersType[type],
            },
          }),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.systemMessage.count({
        where: { userId },
      }),
    ]);

    res.status(200).send({
      data: systemMessages,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
