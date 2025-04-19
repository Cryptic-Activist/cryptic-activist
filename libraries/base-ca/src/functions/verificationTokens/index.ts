import {
  CreateManyVerificationTokens,
  CreateVerificationToken,
  DeleteVerificationTokenParams,
  GetVerificationTokenParams,
  GetVerificationTokensPaginationParams,
  GetVerificationTokensParams,
  UpdateVerificationTokenParams,
} from './types';

import { prisma } from '../../services/prisma';

export const createVerificationToken = async (
  params: CreateVerificationToken
) => {
  try {
    const newVerificationToken =
      await prisma.verificationToken.upsert(params);
    return newVerificationToken;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyVerificationTokens = async (
  params: CreateManyVerificationTokens[]
) => {
  try {
    const newVerificationTokens =
      await prisma.verificationToken.createMany({
        data: params,
      });

    return newVerificationTokens;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateVerificationToken = async ({
  toUpdate,
  where,
}: UpdateVerificationTokenParams) => {
  const updated = await prisma.verificationToken.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteVerificationToken = async ({
  where,
}: DeleteVerificationTokenParams) => {
  const deleted = await prisma.verificationToken.delete({
    where,
  });
  return deleted;
};

export const getVerificationToken = async ({
  where,
  select,
}: GetVerificationTokenParams) => {
  const user = await prisma.verificationToken.findFirst({
    ...(select && { select }),
    where,
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getVerificationTokens = async ({
  limit,
  where,
  select,
  orderBy,
}: GetVerificationTokensParams) => {
  const users = await prisma.verificationToken.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    ...(orderBy && { orderBy }),
    where,
  });

  return users;
};

export const getVerificationTokensPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetVerificationTokensPaginationParams) => {
  const users = await prisma.verificationToken.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return users;
};

export const countVerificationTokens = async () => {
  const count = await prisma.verificationToken.count();
  return count;
};
