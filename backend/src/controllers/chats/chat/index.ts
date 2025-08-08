import { Request, Response } from 'express';

import ChatMessage from '@/models/ChatMessage';
import { prisma } from '@/services/db/prisma';
import { retrieveChatMessageWithAttachments } from '@/services/chat';

export const createChatController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newChat = await prisma.chat.create({
      data: body,
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

    let query = ChatMessage.find(
      { chatId: id },
      'createdAt from message type to attachment',
    );

    query = query.sort('desc');

    const chatMessages = await query.exec();

    const chatMessagesWithAttachments =
      await retrieveChatMessageWithAttachments(chatMessages);

    res.status(200).send(chatMessagesWithAttachments);
  } catch (err) {
    res.status(500).send({
      errors: [err.message],
    });
  }
};
