import { Request, Response } from 'express';
import { createChat, getChatMessages } from 'base-ca';

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

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { id } = params;

    const chatMessages = await getChatMessages({
      where: {
        chatId: id,
      },
      orderBy: 'desc',
    });

    res.status(200).send(chatMessages);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
