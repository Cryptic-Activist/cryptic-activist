import {
  CreateManyTokens,
  CreateToken,
  DeleteTokenParams,
  GetTokenParams,
  GetTokensPaginationParams,
  GetTokensParams,
  UpdateTokenParams,
} from './types';

import { prisma } from '../../services/prisma';

export const createToken = async (params: CreateToken) => {
  try {
    const newToken = await prisma.token.upsert(params);
    return newToken;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTokens = async (
  params: CreateManyTokens[]
) => {
  try {
    const newTokens = await prisma.token.createMany({
      data: params,
    });

    return newTokens;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateToken = async ({
  toUpdate,
  where,
}: UpdateTokenParams) => {
  const updated = await prisma.token.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteToken = async ({ where }: DeleteTokenParams) => {
  const deleted = await prisma.token.delete({
    where,
  });
  return deleted;
};

export const getToken = async ({ where, select }: GetTokenParams) => {
  const user = await prisma.token.findFirst({
    ...(select && { select }),
    where,
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getTokens = async ({
  limit,
  where,
  select,
  orderBy,
}: GetTokensParams) => {
  const users = await prisma.token.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    ...(orderBy && { orderBy }),
    where,
  });

  return users;
};

export const getTokensPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTokensPaginationParams) => {
  const users = await prisma.token.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return users;
};

export const countTokens = async () => {
  const count = await prisma.token.count();
  return count;
};
