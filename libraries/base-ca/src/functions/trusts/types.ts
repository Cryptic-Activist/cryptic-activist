import { Prisma } from '@/services/prisma';

export type CreateTrust = Prisma.TrustCreateInput;

export type CreateManyTrusts = Prisma.TrustCreateManyInput;

export type WhereTrust = Prisma.TrustWhereUniqueInput;

export type UpdateTrustParams = {
  toUpdate: Prisma.TrustUpdateInput;
  where: Prisma.TrustWhereUniqueInput;
};

export type DeleteTrustParams = {
  where: Prisma.TrustWhereUniqueInput;
};

export type GetTrustParams = {
  where?: Prisma.TrustWhereInput;
  select?: Prisma.TrustSelect;
};

export type GetTrustsParams = {
  where?: Prisma.TrustWhereInput;
  limit?: number;
  select?: Prisma.TrustSelect;
};

export type GetTrustsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TrustWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TrustWhereInput;
  select?: Prisma.TrustSelect;
  orderBy?: Prisma.TrustOrderByWithAggregationInput;
};
