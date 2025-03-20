import { Prisma } from '@/services/prisma';

export type CreateAcceptedCryptocurrency =
  Prisma.AcceptedCryptocurrencyCreateInput;

export type WhereAcceptedCryptocurrency =
  Prisma.AcceptedCryptocurrencyWhereUniqueInput;

export type UpdateAcceptedCryptocurrencyParams = {
  toUpdate: Prisma.AcceptedCryptocurrencyUpdateInput;
  where: Prisma.AcceptedCryptocurrencyWhereUniqueInput;
};

export type DeleteAcceptedCryptocurrencyParams = {
  where: Prisma.AcceptedCryptocurrencyWhereUniqueInput;
};

export type GetAcceptedCryptocurrencyParams = {
  where?: Prisma.AcceptedCryptocurrencyWhereInput;
  select?: Prisma.AcceptedCryptocurrencySelect;
};

export type GetAcceptedCryptocurrenciesParams = {
  where?: Prisma.AcceptedCryptocurrencyWhereInput;
  limit?: number;
  select?: Prisma.AcceptedCryptocurrencySelect;
  orderBy?: Prisma.AcceptedCryptocurrencyOrderByWithAggregationInput;
};

export type GetAcceptedCryptocurrenciesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.AcceptedCryptocurrencyWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.AcceptedCryptocurrencyWhereInput;
  select?: Prisma.AcceptedCryptocurrencySelect;
  orderBy?: Prisma.AcceptedCryptocurrencyOrderByWithAggregationInput;
};
