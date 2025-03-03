import 'dotenv/config';

import { PrismaClient, User } from '@prisma/client';

import {
  getParamsRemapping,
  getUsersParamsRemapping,
} from '../../utils/remap/user';
import {
  CreateUserParams,
  UserAssociationsArrayType,
  WhereUserFullTextParams,
  WhereUserParams,
} from './types';

const prisma = new PrismaClient();

export const createUser = async (
  params: CreateUserParams
): Promise<User> => {
  const created = await prisma.user.create({
    data: params,
  });
  return created;
};

export const updateUser = async (
  where: WhereUserParams,
  toUpdate: WhereUserParams
): Promise<User> => {
  const updated = await prisma.user.update({
    where,
    data: toUpdate,
  });
  return updated;
};

export const deleteUser = async (where: User): Promise<User> => {
  const deleted = await prisma.user.delete({ where });
  return deleted;
};

export const getUser = async (
  where: WhereUserParams,
  associations: UserAssociationsArrayType
): Promise<User | null> => {
  console.log({ DATABASE_URL: process.env.DATABASE_URL });
  const remapped = getParamsRemapping(where);
  const user = await prisma.user.findFirst({
    where: remapped,
    ...(Object.entries(associations).length && {
      include: associations,
    }),
  });

  if (!user) return null;

  return user;
};

export const getUsers = async (
  associations: UserAssociationsArrayType,
  where?: WhereUserParams,
  limit?: number
): Promise<User[]> => {
  const remapped = getUsersParamsRemapping(where);
  const users = await prisma.user.findMany({
    take: limit,
    where: remapped,
    include: associations,
  });

  return users;
};

export const getUsersPagination = async (
  associations: UserAssociationsArrayType,
  limit: number,
  offset: number,
  where?: WhereUserParams
): Promise<User[]> => {
  const remapped = getUsersParamsRemapping(where);
  const users = await prisma.user.findMany({
    take: limit,
    skip: offset,
    where: remapped,
    include: associations,
  });

  return users;
};

export const getUsersByMultiple = async (
  associations: UserAssociationsArrayType,
  where?: WhereUserFullTextParams,
  limit?: number
) => {
  const users = await prisma.user.findMany({
    take: limit,
    where,
    include: associations,
  });

  return users;
};
