import { Request, Response } from 'express';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';
import { createSystemMessage, getSystemMessages } from 'base-ca';

export async function getSystemMessagesController(req: Request, res: Response) {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const systemMessages = await getSystemMessages({ where });

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

    const createdSystemMessage = await createSystemMessage({
      where: { id: '' },
      update: {},
      create: body,
    });

    res.status(200).send(createdSystemMessage);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
