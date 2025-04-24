import { removeSpecialCharsAndNumbers, toCapitalize } from '@/utils/string';

import { prisma } from '../db';

export const associateLanguage = async (
  userId: string,
  languageName: string,
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    return false;
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
    return true;
  }

  await prisma.userLanguage.create({
    data: { languageId: language?.id, userId: user?.id },
  });

  return true;
};

export const diassociateLanguage = async (
  userId: string,
  languageId: string,
): Promise<boolean> => {
  const deleted = await prisma.userLanguage.delete({
    where: {
      userId_languageId: {
        languageId,
        userId,
      },
    },
  });

  if (!deleted) {
    return false;
  }

  return true;
};
