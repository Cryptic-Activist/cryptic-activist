import { Prisma } from '@/services/prisma';

export type CreateToken = Prisma.TokenUpsertArgs;

export type CreateManyTokens = Prisma.TokenCreateManyInput;

export type TokenWhereInput = Prisma.TokenWhereInput;

export type UpdateTokenParams = {
  toUpdate: Prisma.TokenUpdateInput;
  where: Prisma.TokenWhereUniqueInput;
};

export type DeleteTokenParams = {
  where: Prisma.TokenWhereUniqueInput;
};

export type GetTokenParams = {
  where?: Prisma.TokenWhereInput;
  select?: Prisma.TokenSelect;
};

export type GetTokensParams = {
  where?: Prisma.TokenWhereInput;
  limit?: number;
  select?: Prisma.TokenSelect;
  orderBy?: Prisma.TokenOrderByWithAggregationInput;
};

export type GetTokensPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TokenWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TokenWhereInput;
  select?: Prisma.TokenSelect;
  orderBy?: Prisma.TokenOrderByWithAggregationInput;
};
