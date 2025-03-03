import { getLanguage } from 'base-ca';
import {
  Admin,
  Block,
  Trust,
  User,
  UserLanguage,
} from 'base-ca/dist/services/prisma';

export const retrieveLanguages = async (userLanguages: UserLanguage[]) => {
  const mappedLanguages = userLanguages.map(async (language) => {
    const lang = await getLanguage({ id: language.languageId });
    return { id: lang?.id, name: lang?.name };
  });

  const languages = await Promise.all(mappedLanguages);
  return languages;
};

export const assignSafeUserData = async (
  user: User & {
    userLanguage: UserLanguage[];
    blocked: Block[];
    blockers: Block[];
    trusted: Trust[];
  },
) => {
  const languages = await retrieveLanguages(user.userLanguage);
  return {
    id: user.id,
    names: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    username: user.username,
    profileColor: user.profileColor,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    languages,
    blocked: user.blocked,
    blockers: user.blockers,
    trusted: user.trusted,
  };
};

export const assignSafeAdminData = async (user: Admin) => {
  return {
    id: user.id,
    names: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
