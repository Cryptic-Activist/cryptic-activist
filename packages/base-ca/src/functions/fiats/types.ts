import { Prisma } from '@/services/prisma';

export type CreateFiat = Prisma.FiatUpsertArgs;

export type CreateManyFiats = Prisma.FiatCreateManyInput;

export type WhereFiat = Prisma.FiatWhereUniqueInput;

export type UpdateFiatParams = {
  toUpdate: Prisma.FiatUpdateInput;
  where: Prisma.FiatWhereUniqueInput;
};

export type DeleteFiatParams = {
  where: Prisma.FiatWhereUniqueInput;
};

export type GetFiatParams = {
  where?: Prisma.FiatWhereInput;
  select?: Prisma.FiatSelect;
};

export type GetFiatsParams = {
  where?: Prisma.FiatWhereInput;
  limit?: number;
  select?: Prisma.FiatSelect;
  orderBy?: Prisma.FiatOrderByWithAggregationInput;
};

export type GetFiatsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.FiatWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.FiatWhereInput;
  select?: Prisma.FiatSelect;
  orderBy?: Prisma.FiatOrderByWithAggregationInput;
};
