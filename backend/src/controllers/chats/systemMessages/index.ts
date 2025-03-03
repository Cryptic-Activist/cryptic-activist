import { createSystemMessage } from 'base-ca';
import { getSystemMessages } from 'cryptic-base';
import { convertWhere, sanitize, sanitizeQueryArray } from 'cryptic-utils';
import { Request, Response } from 'express';

export async function getSystemMessagesController(
  req: Request,
  res: Response,
): Promise<Response> {
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

    return res.status(200).send({
      status_code: 200,
      results: systemMessages,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
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
