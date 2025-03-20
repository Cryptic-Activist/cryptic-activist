import { Prisma } from '@/services/prisma';

export type CreatePremiumPurchase = Prisma.PremiumPurchaseCreateInput;

export type CreateManyPremiumPurchases =
  Prisma.PremiumPurchaseCreateManyInput;

export type WherePremiumPurchase =
  Prisma.PremiumPurchaseWhereUniqueInput;

export type UpdatePremiumPurchaseParams = {
  toUpdate: Prisma.PremiumPurchaseUpdateInput;
  where: Prisma.PremiumPurchaseWhereUniqueInput;
};

export type DeletePremiumPurchaseParams = {
  where: Prisma.PremiumPurchaseWhereUniqueInput;
};

export type GetPremiumPurchaseParams = {
  where?: Prisma.PremiumPurchaseWhereInput;
  select?: Prisma.PremiumPurchaseSelect;
};

export type GetPremiumPurchasesParams = {
  where?: Prisma.PremiumPurchaseWhereInput;
  limit?: number;
  select?: Prisma.PremiumPurchaseSelect;
  orderBy?: Prisma.PremiumPurchaseOrderByWithAggregationInput;
};

export type GetPremiumPurchasesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.PremiumPurchaseWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.PremiumPurchaseWhereInput;
  select?: Prisma.PremiumPurchaseSelect;
  orderBy?: Prisma.PremiumPurchaseOrderByWithAggregationInput;
};
