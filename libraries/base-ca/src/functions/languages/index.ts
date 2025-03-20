import {
  BatchPayload,
  Language,
  prisma,
} from '../../services/prisma';
import {
  CreateLanguage,
  CreateManyLanguages,
  DeleteLanguageParams,
  GetLanguageParams,
  GetLanguagesPaginationParams,
  GetLanguagesParams,
  UpdateLanguageParams,
} from './types';

export const createLanguage = async (
  params: CreateLanguage
): Promise<Language> => {
  try {
    const newLanguage = await prisma.language.upsert(params);

    return newLanguage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyLanguages = async (
  params: CreateManyLanguages[]
): Promise<BatchPayload> => {
  try {
    const newLanguages = await prisma.language.createMany({
      data: params,
    });

    return newLanguages;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateLanguage = async ({
  toUpdate,
  where,
}: UpdateLanguageParams): Promise<Language> => {
  const updated = await prisma.language.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteLanguage = async ({
  where,
}: DeleteLanguageParams): Promise<Language> => {
  const deleted = await prisma.language.delete({
    where,
  });
  return deleted;
};

export const getLanguage = async ({
  where,
  select,
}: GetLanguageParams): Promise<Language | null> => {
  const language = await prisma.language.findFirst({
    ...(select && { select }),
    where,
  });

  if (!language) {
    return null;
  }

  return language;
};

export const getLanguages = async ({
  limit,
  where,
  select,
}: GetLanguagesParams): Promise<Language[]> => {
  const languages = await prisma.language.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return languages;
};

export const getLanguagesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetLanguagesPaginationParams): Promise<Language[]> => {
  const languages = await prisma.language.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return languages;
};

export const countLanguages = async () => {
  const count = await prisma.language.count();
  return count;
};
