import { BatchPayload, Chat, prisma } from '../../services/prisma';
import {
  CreateChat,
  CreateManyChats,
  DeleteChatParams,
  GetChatParams,
  GetChatsPaginationParams,
  GetChatsParams,
  UpdateChatParams,
  WhereChat,
} from './types';

export const createChat = async (
  params: CreateChat
): Promise<Chat> => {
  try {
    const chat = await prisma.chat.findFirst({
      where: params as WhereChat,
    });

    if (chat) {
      return chat;
    }

    const newChat = await prisma.chat.create({
      data: params,
    });

    return newChat;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyChats = async (
  params: CreateManyChats[]
): Promise<BatchPayload> => {
  try {
    const newChats = await prisma.chat.createMany({
      data: params,
    });

    return newChats;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateChat = async ({
  toUpdate,
  where,
}: UpdateChatParams): Promise<Chat> => {
  const updated = await prisma.chat.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteChat = async ({
  where,
}: DeleteChatParams): Promise<Chat> => {
  const deleted = await prisma.chat.delete({
    where,
  });
  return deleted;
};

export const getChat = async ({
  where,
  select,
}: GetChatParams): Promise<Chat | null> => {
  const chat = await prisma.chat.findFirst({
    ...(select && { select }),
    where,
  });

  if (!chat) {
    return null;
  }

  return chat;
};

export const getChats = async ({
  limit,
  where,
  select,
}: GetChatsParams): Promise<Chat[]> => {
  const chats = await prisma.chat.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return chats;
};

export const getChatsPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetChatsPaginationParams): Promise<Chat[]> => {
  const chats = await prisma.chat.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return chats;
};

export const countChats = async () => {
  const count = await prisma.chat.count();
  return count;
};
