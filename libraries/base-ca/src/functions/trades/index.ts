import { Trade, prisma } from '../../services/prisma';
import {
  createParamsRemapping,
  getParamsRemapping,
} from '../../utils/remap/trades';
import {
  CreateTradeParams,
  TradeAssociationsArrayType,
  WhereTradeParams,
} from './types';

export const createTrade = async (
  params: CreateTradeParams
): Promise<Trade | null> => {
  const remapped = createParamsRemapping(params);
  const created = await prisma.trade.create({ data: remapped });
  return created;
};

export const updateTrade = async (
  toUpdate: WhereTradeParams,
  where: WhereTradeParams
): Promise<Trade> => {
  const updated = await prisma.trade.update({
    data: toUpdate,
    where,
  });
  return updated;
};

export const deleteTrade = async (
  where: WhereTradeParams
): Promise<Trade> => {
  const deleted = await prisma.trade.delete({ where });
  return deleted;
};

export const getTrade = async (
  where: WhereTradeParams,
  associations: TradeAssociationsArrayType
): Promise<Trade | null> => {
  const remapped = getParamsRemapping(where);
  const trade = await prisma.trade.findFirst({
    where,
    include: associations,
  });

  if (!trade) return null;

  return trade;
};

export const getTrades = async (
  associations: TradeAssociationsArrayType,
  where?: WhereTradeParams,
  limit?: number
): Promise<Trade[]> => {
  const remapped = getParamsRemapping(where);
  const trades = await prisma.trade.findMany({
    take: limit,
    where,
    include: associations,
  });

  return trades;
};

export const getTradesPagination = async (
  associations: TradeAssociationsArrayType,
  limit: number,
  offset: number,
  where?: WhereTradeParams
): Promise<Trade[]> => {
  const remapped = getParamsRemapping(where);
  const trades = await prisma.trade.findMany({
    take: limit,
    skip: offset,
    where,
    include: associations,
  });

  return trades;
};
