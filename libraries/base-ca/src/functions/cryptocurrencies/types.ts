import { Prisma } from '@/services/prisma';

export type CreateCryptocurrency = Prisma.CryptocurrencyCreateInput;

export type CreateManyCryptocurrencies =
  Prisma.CryptocurrencyCreateManyInput;

export type WhereCryptocurrency =
  Prisma.CryptocurrencyWhereUniqueInput;

export type UpdateCryptocurrencyParams = {
  toUpdate: Prisma.CryptocurrencyUpdateInput;
  where: Prisma.CryptocurrencyWhereUniqueInput;
};

export type DeleteCryptocurrencyParams = {
  where: Prisma.CryptocurrencyWhereUniqueInput;
};

export type GetCryptocurrencyParams = {
  where?: Prisma.CryptocurrencyWhereInput;
  select?: Prisma.CryptocurrencySelect;
};

export type GetCryptocurrenciesParams = {
  where?: Prisma.CryptocurrencyWhereInput;
  limit?: number;
  select?: Prisma.CryptocurrencySelect;
};

export type GetCryptocurrenciesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.CryptocurrencyWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.CryptocurrencyWhereInput;
  select?: Prisma.CryptocurrencySelect;
  orderBy?: Prisma.CryptocurrencyOrderByWithAggregationInput;
};
