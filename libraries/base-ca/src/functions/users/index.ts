import { BatchPayload, User, prisma } from '../../services/prisma';
import {
  CreateManyUsers,
  CreateUser,
  DeleteUserParams,
  GetUserParams,
  GetUsersPaginationParams,
  GetUsersParams,
  UpdateUserParams,
} from './types';

export const createUser = async (params: CreateUser) => {
  try {
    const newUser = await prisma.user.upsert(params);
    return newUser;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyUsers = async (params: CreateManyUsers[]) => {
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
}: UpdateUserParams) => {
  const updated = await prisma.user.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteUser = async ({ where }: DeleteUserParams) => {
  const deleted = await prisma.user.delete({
    where,
  });
  return deleted;
};

export const getUser = async ({ where, select }: GetUserParams) => {
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
}: GetUsersParams) => {
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
}: GetUsersPaginationParams) => {
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
