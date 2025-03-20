import { Prisma } from '@/services/prisma';

export type CreateKYC = Prisma.KYCCreateInput;

export type CreateManyKYCs = Prisma.KYCCreateManyInput;

export type WhereKYC = Prisma.KYCWhereUniqueInput;

export type UpdateKYCParams = {
  toUpdate: Prisma.KYCUpdateInput;
  where: Prisma.KYCWhereUniqueInput;
};

export type DeleteKYCParams = {
  where: Prisma.KYCWhereUniqueInput;
};

export type GetKYCParams = {
  where?: Prisma.KYCWhereInput;
  select?: Prisma.KYCSelect;
};

export type GetKYCsParams = {
  where?: Prisma.KYCWhereInput;
  limit?: number;
  select?: Prisma.KYCSelect;
};

export type GetKYCsPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.KYCWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.KYCWhereInput;
  select?: Prisma.KYCSelect;
  orderBy?: Prisma.KYCOrderByWithAggregationInput;
};
