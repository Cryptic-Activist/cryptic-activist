import { BatchPayload, Trade, prisma } from '../../services/prisma';
import {
  CreateManyTrades,
  CreateTrade,
  DeleteTradeParams,
  GetTradeParams,
  GetTradesCountParams,
  GetTradesPaginationParams,
  GetTradesParams,
  UpdateManyTradesParams,
  UpdateTradeParams,
} from './types';

export const createTrade = async (params: CreateTrade) => {
  try {
    const newTrade = await prisma.trade.upsert(params);

    return newTrade;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTrades = async (
  params: CreateManyTrades[]
) => {
  try {
    const newTrades = await prisma.trade.createMany({
      data: params,
    });

    return newTrades;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTrade = async ({
  toUpdate,
  where,
}: UpdateTradeParams) => {
  const updated = await prisma.trade.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const updateManyTrades = async ({
  toUpdate,
  where,
}: UpdateManyTradesParams) => {
  const updated = await prisma.trade.updateMany({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTrade = async ({ where }: DeleteTradeParams) => {
  const deleted = await prisma.trade.delete({
    where,
  });
  return deleted;
};

export const getTrade = async ({ where, select }: GetTradeParams) => {
  const trade = await prisma.trade.findFirst({
    ...(select && { select }),
    where,
  });

  if (!trade) {
    return null;
  }

  return trade;
};

export const getTrades = async ({
  limit,
  where,
  select,
}: GetTradesParams) => {
  const trades = await prisma.trade.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return trades;
};

export const getTradesPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTradesPaginationParams) => {
  const trades = await prisma.trade.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return trades;
};

export const countTrades = async ({
  where,
}: GetTradesCountParams) => {
  const count = await prisma.trade.count({
    ...(where && { where }),
  });
  return count;
};
