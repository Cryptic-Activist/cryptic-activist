import { removeSpecialCharsAndNumbers, toCapitalize } from '@/utils/string';

import { prisma } from '../db';

export const associateLanguage = async (
  userId: string,
  languageName: string,
) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  const sanitized = removeSpecialCharsAndNumbers(languageName.trim());
  const capitalizedLanguageName = toCapitalize(sanitized);

  const language = await prisma.language.upsert({
    where: {
      name: capitalizedLanguageName,
    },
    update: {},
    create: {
      name: capitalizedLanguageName,
    },
  });

  const userLanguage = await prisma.userLanguage.findFirst({
    where: {
      languageId: language?.id,
      userId,
    },
  });

  if (userLanguage) {
    return userLanguage;
  }

  const newUserLanguage = await prisma.userLanguage.create({
    data: { languageId: language?.id, userId: user?.id },
  });

  console.log({ newUserLanguage });

  return newUserLanguage;
};

export const diassociateLanguage = async (
  userId: string,
  languageId: string,
) => {
  const deleted = await prisma.userLanguage.delete({
    where: {
      userId_languageId: {
        languageId,
        userId,
      },
    },
  });

  if (!deleted) {
    return null;
  }

  return deleted;
};
