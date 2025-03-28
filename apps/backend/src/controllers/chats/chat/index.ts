import { Request, Response } from 'express';

import { createChat } from 'base-ca';

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newChat = await createChat({
      create: body,
      update: {},
      where: { id: '' },
    });

    res.status(200).send(newChat);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
