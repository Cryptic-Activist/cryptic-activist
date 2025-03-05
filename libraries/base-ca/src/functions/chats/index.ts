import { Chat, prisma } from '../../services/prisma';
import {
  CreateChatParamsType,
  DeleteChatWhereType,
  GetChatReturnType,
  GetChatWhereType,
  UpdateChatToUpdateType,
  UpdateChatWhereType,
} from './types';

export const createChat = async (
  params: CreateChatParamsType
): Promise<Chat | null> => {
  try {
    const chat = await prisma.chat.findFirst({ where: params });

    if (chat) return chat;

    const newChat = await prisma.chat.create({ data: params });

    return newChat;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateChat = async (
  where: UpdateChatWhereType,
  toUpdate: UpdateChatToUpdateType
): Promise<Chat> => {
  const updated = await prisma.chat.update({ where, data: toUpdate });
  return updated;
};

export const deleteChat = async (
  where: DeleteChatWhereType
): Promise<Chat> => {
  const deleted = await prisma.chat.delete({ where });
  return deleted;
};

export const getChat = async (
  where: GetChatWhereType
): Promise<Chat | null> => {
  const chat = await prisma.chat.findFirst({
    where,
  });

  if (!chat) {
    return null;
  }

  return chat;
};

export const getChats = async (
  where?: GetChatWhereType,
  limit?: number
): Promise<Chat[]> => {
  const chats = await prisma.chat.findMany({
    where,
    take: limit,
  });

  return chats;
};

export const getChatsPagination = async (
  limit: number,
  offset: number,
  where?: GetChatWhereType
): Promise<Chat[]> => {
  const chats = await prisma.chat.findMany({
    take: limit,
    skip: offset,
    where,
  });

  return chats;
};
