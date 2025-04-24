import { Request, Response } from 'express';
import { sanitize, sanitizeQueryArray } from '@/utils/sanitizer';

import { convertWhere } from '@/utils/object';
import { prisma } from '@/services/db/prisma';

export async function getSystemMessagesController(req: Request, res: Response) {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const systemMessages = await prisma.systemMessage.findMany({ where });

    res.status(200).send(systemMessages);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
}

export const createSystemMessageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { body } = req;

    const createdSystemMessage = await prisma.systemMessage.create({
      data: body,
    });

    res.status(200).send(createdSystemMessage);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
