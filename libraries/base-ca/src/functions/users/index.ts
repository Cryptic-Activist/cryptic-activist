import { BatchPayload, User, prisma } from '../../services/prisma';
import {
  CreateManyUsers,
  CreateUser,
  DeleteUserParams,
  GetUserParams,
  GetUsersPaginationParams,
  GetUsersParams,
  UpdateUserParams,
  UserWhereInput,
} from './types';

import { getUsersParamsRemapping } from '@/utils/remap/user';

export const createUser = async (
  params: CreateUser
): Promise<User> => {
  try {
    const remapped = getUsersParamsRemapping(
      params as UserWhereInput
    );
    console.log({ remapped });
    const user = await prisma.user.findFirst({
      where: remapped as UserWhereInput,
    });

    if (user) {
      return user;
    }

    const newUser = await prisma.user.create({
      data: params,
    });

    return newUser;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyUsers = async (
  params: CreateManyUsers[]
): Promise<BatchPayload> => {
  try {
    const newUsers = await prisma.user.createMany({
      data: params,
    });

    return newUsers;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateUser = async ({
  toUpdate,
  where,
}: UpdateUserParams): Promise<User> => {
  const updated = await prisma.user.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteUser = async ({
  where,
}: DeleteUserParams): Promise<User> => {
  const deleted = await prisma.user.delete({
    where,
  });
  return deleted;
};

export const getUser = async ({
  where,
  select,
}: GetUserParams): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    ...(select && { select }),
    where,
  });

  if (!user) {
    return null;
  }

  return user;
};

export const getUsers = async ({
  limit,
  where,
  select,
}: GetUsersParams): Promise<User[]> => {
  const users = await prisma.user.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return users;
};

export const getUsersPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetUsersPaginationParams): Promise<User[]> => {
  const users = await prisma.user.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return users;
};

export const countUsers = async () => {
  const count = await prisma.user.count();
  return count;
};
