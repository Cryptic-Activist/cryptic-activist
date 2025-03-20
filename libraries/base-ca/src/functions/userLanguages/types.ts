import { Prisma } from '@/services/prisma';

export type CreateUserLanguage = Prisma.UserLanguageCreateInput;

export type CreateManyUserLanguages =
  Prisma.UserLanguageCreateManyInput;

export type UserLanguageWhereInput = Prisma.UserLanguageWhereInput;

export type UpdateUserLanguageParams = {
  toUpdate: Prisma.UserLanguageUpdateInput;
  where: Prisma.UserLanguageWhereUniqueInput;
};

export type DeleteUserLanguageParams = {
  where: Prisma.UserLanguageWhereUniqueInput;
};

export type GetUserLanguageParams = {
  where?: Prisma.UserLanguageWhereInput;
  select?: Prisma.UserLanguageSelect;
};

export type GetUserLanguagesParams = {
  where?: Prisma.UserLanguageWhereInput;
  limit?: number;
  select?: Prisma.UserLanguageSelect;
};

export type GetUserLanguagesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.UserLanguageWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.UserLanguageWhereInput;
  select?: Prisma.UserLanguageSelect;
  orderBy?: Prisma.UserLanguageOrderByWithAggregationInput;
};
