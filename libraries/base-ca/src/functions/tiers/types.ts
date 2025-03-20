import { Prisma } from '@/services/prisma';

export type CreateTier = Prisma.TierCreateInput;

export type CreateManyTiers = Prisma.TierCreateManyInput;

export type WhereTier = Prisma.TierWhereUniqueInput;

export type UpdateTierParams = {
  toUpdate: Prisma.TierUpdateInput;
  where: Prisma.TierWhereUniqueInput;
};

export type DeleteTierParams = {
  where: Prisma.TierWhereUniqueInput;
};

export type GetTierParams = {
  where?: Prisma.TierWhereInput;
  select?: Prisma.TierSelect;
};

export type GetTiersParams = {
  where?: Prisma.TierWhereInput;
  limit?: number;
  select?: Prisma.TierSelect;
};

export type GetTiersPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TierWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TierWhereInput;
  select?: Prisma.TierSelect;
  orderBy?: Prisma.TierOrderByWithAggregationInput;
};
