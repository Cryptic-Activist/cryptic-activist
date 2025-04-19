import { Prisma } from '@/services/prisma';

export type CreateVerificationToken =
  Prisma.VerificationTokenUpsertArgs;

export type CreateManyVerificationTokens =
  Prisma.VerificationTokenCreateManyInput;

export type VerificationTokenWhereInput =
  Prisma.VerificationTokenWhereInput;

export type UpdateVerificationTokenParams = {
  toUpdate: Prisma.VerificationTokenUpdateInput;
  where: Prisma.VerificationTokenWhereUniqueInput;
};

export type DeleteVerificationTokenParams = {
  where: Prisma.VerificationTokenWhereUniqueInput;
};

export type GetVerificationTokenParams = {
  where?: Prisma.VerificationTokenWhereInput;
  select?: Prisma.VerificationTokenSelect;
};

export type GetVerificationTokensParams = {
  where?: Prisma.VerificationTokenWhereInput;
  limit?: number;
  select?: Prisma.VerificationTokenSelect;
  orderBy?: Prisma.VerificationTokenOrderByWithAggregationInput;
};

export type GetVerificationTokensPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.VerificationTokenWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.VerificationTokenWhereInput;
  select?: Prisma.VerificationTokenSelect;
  orderBy?: Prisma.VerificationTokenOrderByWithAggregationInput;
};
