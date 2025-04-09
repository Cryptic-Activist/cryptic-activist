import { Prisma } from '@/services/prisma';

export type CreateTrade = Prisma.TradeUpsertArgs;

export type CreateManyTrades = Prisma.TradeCreateManyInput;

export type WhereTrade = Prisma.TradeWhereUniqueInput;

export type UpdateTradeParams = {
  toUpdate: Prisma.TradeUpdateInput;
  where: Prisma.TradeWhereUniqueInput;
};

export type UpdateManyTradesParams = {
  toUpdate: Prisma.TradeUpdateInput;
  where: Prisma.TradeWhereInput;
};

export type DeleteTradeParams = {
  where: Prisma.TradeWhereUniqueInput;
};

export type GetTradeParams = {
  where?: Prisma.TradeWhereInput;
  select?: Prisma.TradeSelect;
};

export type GetTradesParams = {
  where?: Prisma.TradeWhereInput;
  limit?: number;
  select?: Prisma.TradeSelect;
  orderBy?: Prisma.TradeOrderByWithAggregationInput;
};

export type GetTradesPaginationParams = {
  limit: number;
  offset?: number;
  cursor?: Prisma.TradeWhereUniqueInput & {
    id: string;
  };
  where?: Prisma.TradeWhereInput;
  select?: Prisma.TradeSelect;
  orderBy?: Prisma.TradeOrderByWithAggregationInput;
};

export type GetTradesCountParams = {
  where?: Prisma.TradeWhereInput;
};
