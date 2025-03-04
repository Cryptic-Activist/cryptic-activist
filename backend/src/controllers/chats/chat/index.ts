import { Request, Response } from 'express';

import { createChat } from 'base-ca';

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newChat = await createChat(body);

    return res.status(200).send({
      status_code: 200,
      results: newChat,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
};
