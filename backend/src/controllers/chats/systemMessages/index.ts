import { Request, Response } from 'express';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';

import { createSystemMessage } from 'base-ca';
import { getSystemMessages } from 'cryptic-base';

export async function getSystemMessagesController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { associations } = req.query;

    const cleanReqQuery = sanitize({ ...req.query }, []);

    cleanReqQuery.associations = sanitizeQueryArray(associations);

    const where = convertWhere({ ...cleanReqQuery }, ['associations']);

    const systemMessages = await getSystemMessages(
      null,
      cleanReqQuery.associations,
      where,
    );

    res.status(200).send({
      results: systemMessages,
      errors: [],
    });
  } catch (err) {
    res.status(500).send({
      results: {},
      errors: [err.message],
    });
  }
}

export const createSystemMessageController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { body } = req;

    const createdSystemMessage = await createSystemMessage(body);

    console.log(createdSystemMessage);

    return res.status(200).send({
      status_code: 200,
      results: createdSystemMessage,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      errors: [err.message],
    });
  }
};
