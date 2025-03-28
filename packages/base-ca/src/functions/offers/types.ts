import { Prisma } from '@/services/prisma';

export type CreateOffer = Prisma.OfferUpsertArgs;

export type CreateManyOffers = Prisma.OfferCreateManyInput;

export type WhereOffer = Prisma.OfferWhereUniqueInput;

export type UpdateOfferParams = {
  toUpdate: Prisma.OfferUpdateInput;
  where: Prisma.OfferWhereUniqueInput;
};

export type DeleteOfferParams = {
  where: Prisma.OfferWhereUniqueInput;
};

export type GetOfferParams = {
  where?: Prisma.OfferWhereInput;
  select?: Prisma.OfferSelect;
};

export type GetOffersParams = {
  where?: Prisma.OfferWhereInput;
  limit?: number;
  select?: Prisma.OfferSelect;
  orderBy?: Prisma.OfferOrderByWithAggregationInput;
};

export type GetOffersPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.OfferWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.OfferWhereInput;
  select?: Prisma.OfferSelect;
  orderBy?: Prisma.OfferOrderByWithAggregationInput;
};
