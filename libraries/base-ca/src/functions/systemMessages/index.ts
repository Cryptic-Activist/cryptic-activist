import { SystemMessage, prisma } from '../../services/prisma';
import {
  CreateSystemMessageParams,
  SystemMessageAssociationsType,
  WhereSystemMessageParams,
} from './types';

export const createSystemMessage = async (
  params: CreateSystemMessageParams
): Promise<SystemMessage> => {
  const created = await prisma.systemMessage.create({ data: params });
  return created;
};

export const updateSystemMessage = async (
  toUpdate: WhereSystemMessageParams,
  where: WhereSystemMessageParams
): Promise<SystemMessage> => {
  const updated = await prisma.systemMessage.update({
    where,
    data: toUpdate,
  });
  return updated;
};

export const deleteSystemMessage = async (
  where: WhereSystemMessageParams
): Promise<SystemMessage> => {
  const deleted = await prisma.systemMessage.delete({ where });
  return deleted;
};

export const getSystemMessage = async (
  where: WhereSystemMessageParams,
  associations: SystemMessageAssociationsType
): Promise<SystemMessage | null> => {
  const systemMessage = await prisma.systemMessage.findFirst({
    where,
    include: associations,
  });

  if (!systemMessage) return null;

  return systemMessage;
};

export const getSystemMessages = async (
  associations: SystemMessageAssociationsType,
  where?: WhereSystemMessageParams,
  limit?: number
): Promise<SystemMessage[]> => {
  const systemMessages = await prisma.systemMessage.findMany({
    take: limit,
    where,
    include: associations,
  });

  return systemMessages;
};

export const getSystemMessagesPagination = async (
  associations: SystemMessageAssociationsType,
  limit: number,
  offset: number,
  where?: WhereSystemMessageParams
): Promise<SystemMessage[]> => {
  const systemMessages = await prisma.systemMessage.findMany({
    take: limit,
    skip: offset,
    where,
    include: associations,
  });

  return systemMessages;
};
