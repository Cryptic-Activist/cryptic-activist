import {
  CreateChatMessageParams,
  CreateManyChatMessagesParams,
  DeleteChatMessageParams,
  GetChatMessageParams,
  GetChatMessagesParams,
  UpdateChatMessageParams,
} from './types';

import ChatMessage from '@/models/ChatMessage';
import { IChatMessage } from '@/models/ChatMessage/types';

export const createChatMessage = async (
  params: CreateChatMessageParams
): Promise<IChatMessage> => {
  try {
    const {} = params;
    const newChatMessage = await ChatMessage.create(params);
    return newChatMessage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyChatMessages = async (
  params: CreateManyChatMessagesParams[]
) => {
  try {
    const newChatMessages = await ChatMessage.insertMany(params);

    return { count: newChatMessages.length };
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateChatMessage = async ({
  toUpdate,
  where,
}: UpdateChatMessageParams) => {
  const updated = await ChatMessage.findOneAndUpdate(
    where,
    toUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  return updated;
};

export const deleteChatMessage = async ({
  where,
}: DeleteChatMessageParams) => {
  const deleted = await ChatMessage.findOneAndDelete(where);
  return deleted;
};

export const getChatMessage = async ({
  where,
}: GetChatMessageParams) => {
  let chatMessage = await ChatMessage.findOne(where);
  return chatMessage;
};

export const getChatMessages = async ({
  where,
  orderBy,
}: GetChatMessagesParams) => {
  let query = ChatMessage.find(
    { chatId: where?.chatId },
    'createdAt from message to'
  );

  if (orderBy) {
    query = query.sort(orderBy);
  }

  const chatMessages = await query.exec();
  return chatMessages;
};

export const countChatMessages = async (): Promise<number> => {
  const count = await ChatMessage.countDocuments({});
  return count;
};
