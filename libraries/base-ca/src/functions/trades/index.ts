import { BatchPayload, Trade, prisma } from '../../services/prisma';
import {
  CreateManyTrades,
  CreateTrade,
  DeleteTradeParams,
  GetTradeParams,
  GetTradesPaginationParams,
  GetTradesParams,
  UpdateTradeParams,
  WhereTrade,
} from './types';

export const createTrade = async (
  params: CreateTrade
): Promise<Trade> => {
  try {
    const trade = await prisma.trade.findFirst({
      where: params as WhereTrade,
    });

    if (trade) {
      return trade;
    }

    const newTrade = await prisma.trade.create({
      data: params,
    });

    return newTrade;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTrades = async (
  params: CreateManyTrades[]
): Promise<BatchPayload> => {
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
}: UpdateTradeParams): Promise<Trade> => {
  const updated = await prisma.trade.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTrade = async ({
  where,
}: DeleteTradeParams): Promise<Trade> => {
  const deleted = await prisma.trade.delete({
    where,
  });
  return deleted;
};

export const getTrade = async ({
  where,
  select,
}: GetTradeParams): Promise<Trade | null> => {
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
}: GetTradesParams): Promise<Trade[]> => {
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
}: GetTradesPaginationParams): Promise<Trade[]> => {
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

export const countTrades = async () => {
  const count = await prisma.trade.count();
  return count;
};
