import { UserLanguage, prisma } from '../../services/prisma';
import {
  AssociateUserToLanguageParams,
  DisassociateUserToLanguageParams,
} from './types';

export const associateUserToLanguage = async (
  params: AssociateUserToLanguageParams
): Promise<any> => {
  try {
    const { languageId, userId } = params;

    const language = await prisma.language.findFirst({
      where: { id: languageId },
    });

    if (!language) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const newUserLanguage = await prisma.userLanguage.create({
      data: { languageId: languageId, userId: userId },
    });

    return newUserLanguage;
  } catch (error: any) {
    throw Error(error);
  }
};

export const disassociateUserToLanguage = async (
  params: DisassociateUserToLanguageParams
): Promise<UserLanguage> => {
  try {
    const { languageId, userId } = params;

    const deleted = await prisma.userLanguage.delete({
      where: { userId_languageId: { languageId, userId } },
    });
    return deleted;
  } catch (error: any) {
    throw Error(error);
  }
};
