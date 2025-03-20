import { Prisma } from '@/services/prisma';

export type CreateLanguage = Prisma.LanguageUpsertArgs;

export type CreateManyLanguages = Prisma.LanguageCreateManyInput;

export type WhereLanguage = Prisma.LanguageWhereUniqueInput;

export type UpdateLanguageParams = {
  toUpdate: Prisma.LanguageUpdateInput;
  where: Prisma.LanguageWhereUniqueInput;
};

export type DeleteLanguageParams = {
  where: Prisma.LanguageWhereUniqueInput;
};

export type GetLanguageParams = {
  where?: Prisma.LanguageWhereInput;
  select?: Prisma.LanguageSelect;
};

export type GetLanguagesParams = {
  where?: Prisma.LanguageWhereInput;
  limit?: number;
  select?: Prisma.LanguageSelect;
  orderBy?: Prisma.LanguageOrderByWithAggregationInput;
};

export type GetLanguagesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.LanguageWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.LanguageWhereInput;
  select?: Prisma.LanguageSelect;
  orderBy?: Prisma.LanguageOrderByWithAggregationInput;
};
