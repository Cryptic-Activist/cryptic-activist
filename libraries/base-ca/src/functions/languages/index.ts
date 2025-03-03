import { Language, prisma } from '../../services/prisma';
import {
  CreateLanguageParams,
  DeleteLanguageWhereType,
  GetLanguageWhereType,
  UpdateLanguageToUpdateType,
  UpdateLanguageWhereType,
} from './types';

export const createLanguage = async (
  params: CreateLanguageParams
): Promise<Language> => {
  try {
    const language = await prisma.language.findFirst({
      where: params,
    });

    if (language) {
      return language;
    }

    const newLanguage = await prisma.language.create({
      data: params,
    });

    return newLanguage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateLanguage = async (
  where: UpdateLanguageWhereType,
  toUpdate: UpdateLanguageToUpdateType
): Promise<Language> => {
  const updated = await prisma.language.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteLanguage = async (
  where: DeleteLanguageWhereType
): Promise<Language> => {
  const deleted = await prisma.language.delete({ where });
  return deleted;
};

export const getLanguage = async (
  where: GetLanguageWhereType
): Promise<Language | null> => {
  const language = await prisma.language.findFirst({
    where,
  });

  if (!language) {
    return null;
  }

  return language;
};

export const getLanguages = async (
  where?: GetLanguageWhereType,
  limit?: number
): Promise<Language[]> => {
  const languages = await prisma.language.findMany({
    where,
    take: limit,
  });

  return languages;
};
