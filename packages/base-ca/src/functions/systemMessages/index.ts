import {
  BatchPayload,
  SystemMessage,
  prisma,
} from '../../services/prisma';
import {
  CreateManySystemMessages,
  CreateSystemMessage,
  DeleteSystemMessageParams,
  GetSystemMessageParams,
  GetSystemMessagesPaginationParams,
  GetSystemMessagesParams,
  UpdateSystemMessageParams,
} from './types';

export const createSystemMessage = async (
  params: CreateSystemMessage
): Promise<SystemMessage> => {
  try {
    const newSystemMessage = await prisma.systemMessage.upsert(
      params
    );

    return newSystemMessage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManySystemMessages = async (
  params: CreateManySystemMessages[]
): Promise<BatchPayload> => {
  try {
    const newSystemMessages = await prisma.systemMessage.createMany({
      data: params,
    });

    return newSystemMessages;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateSystemMessage = async ({
  toUpdate,
  where,
}: UpdateSystemMessageParams): Promise<SystemMessage> => {
  const updated = await prisma.systemMessage.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteSystemMessage = async ({
  where,
}: DeleteSystemMessageParams): Promise<SystemMessage> => {
  const deleted = await prisma.systemMessage.delete({
    where,
  });
  return deleted;
};

export const getSystemMessage = async ({
  where,
  select,
}: GetSystemMessageParams): Promise<SystemMessage | null> => {
  const systemMessage = await prisma.systemMessage.findFirst({
    ...(select && { select }),
    where,
  });

  if (!systemMessage) {
    return null;
  }

  return systemMessage;
};

export const getSystemMessages = async ({
  limit,
  where,
  select,
}: GetSystemMessagesParams): Promise<SystemMessage[]> => {
  const systemMessages = await prisma.systemMessage.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return systemMessages;
};

export const getSystemMessagesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetSystemMessagesPaginationParams): Promise<SystemMessage[]> => {
  const systemMessages = await prisma.systemMessage.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return systemMessages;
};

export const countSystemMessages = async () => {
  const count = await prisma.systemMessage.count();
  return count;
};
