import {
  BatchPayload,
  UserLanguage,
  prisma,
} from '../../services/prisma';
import {
  CreateManyUserLanguages,
  CreateUserLanguage,
  DeleteUserLanguageParams,
  GetUserLanguageParams,
  GetUserLanguagesPaginationParams,
  GetUserLanguagesParams,
  UpdateUserLanguageParams,
  UserLanguageWhereInput,
} from './types';

export const createUserLanguage = async (
  params: CreateUserLanguage
): Promise<UserLanguage> => {
  try {
    const userLanguage = await prisma.userLanguage.findFirst({
      where: params as UserLanguageWhereInput,
    });

    if (userLanguage) {
      return userLanguage;
    }

    const newUserLanguage = await prisma.userLanguage.create({
      data: params,
    });

    return newUserLanguage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyUserLanguages = async (
  params: CreateManyUserLanguages[]
): Promise<BatchPayload> => {
  try {
    const newUserLanguages = await prisma.userLanguage.createMany({
      data: params,
    });

    return newUserLanguages;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateUserLanguage = async ({
  toUpdate,
  where,
}: UpdateUserLanguageParams): Promise<UserLanguage> => {
  const updated = await prisma.userLanguage.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteUserLanguage = async ({
  where,
}: DeleteUserLanguageParams): Promise<UserLanguage> => {
  const deleted = await prisma.userLanguage.delete({
    where,
  });
  return deleted;
};

export const getUserLanguage = async ({
  where,
  select,
}: GetUserLanguageParams): Promise<UserLanguage | null> => {
  const userLanguage = await prisma.userLanguage.findFirst({
    ...(select && { select }),
    where,
  });

  if (!userLanguage) {
    return null;
  }

  return userLanguage;
};

export const getUserLanguages = async ({
  limit,
  where,
  select,
}: GetUserLanguagesParams): Promise<UserLanguage[]> => {
  const userLanguages = await prisma.userLanguage.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return userLanguages;
};

export const getUserLanguagesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetUserLanguagesPaginationParams): Promise<UserLanguage[]> => {
  const userLanguages = await prisma.userLanguage.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return userLanguages;
};
