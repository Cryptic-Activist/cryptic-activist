import { BatchPayload, Tier, prisma } from '../../services/prisma';
import {
  CreateManyTiers,
  CreateTier,
  DeleteTierParams,
  GetTierParams,
  GetTiersPaginationParams,
  GetTiersParams,
  UpdateTierParams,
} from './types';

export const createTier = async (
  params: CreateTier
): Promise<Tier> => {
  try {
    const newTier = await prisma.tier.upsert(params);

    return newTier;
  } catch (error: any) {
    throw Error(error);
  }
};

export const createManyTiers = async (
  params: CreateManyTiers[]
): Promise<BatchPayload> => {
  try {
    const newTiers = await prisma.tier.createMany({
      data: params,
    });

    return newTiers;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateTier = async ({
  toUpdate,
  where,
}: UpdateTierParams): Promise<Tier> => {
  const updated = await prisma.tier.update({
    where,
    data: toUpdate,
  });

  return updated;
};

export const deleteTier = async ({
  where,
}: DeleteTierParams): Promise<Tier> => {
  const deleted = await prisma.tier.delete({
    where,
  });
  return deleted;
};

export const getTier = async ({
  where,
  select,
}: GetTierParams): Promise<Tier | null> => {
  const tier = await prisma.tier.findFirst({
    ...(select && { select }),
    where,
  });

  if (!tier) {
    return null;
  }

  return tier;
};

export const getTiers = async ({
  limit,
  where,
  select,
}: GetTiersParams): Promise<Tier[]> => {
  const tiers = await prisma.tier.findMany({
    ...(limit && { take: limit }),
    ...(select && { select }),
    where,
  });

  return tiers;
};

export const getTiersPagination = async ({
  limit,
  select,
  where,
  offset,
  cursor,
  orderBy,
}: GetTiersPaginationParams): Promise<Tier[]> => {
  const tiers = await prisma.tier.findMany({
    take: limit,
    ...(offset && { skip: offset }),
    ...(select && { select }),
    ...(cursor && { cursor }),
    ...(orderBy && { orderBy }),
    where,
  });

  return tiers;
};

export const countTiers = async () => {
  const count = await prisma.tier.count();
  return count;
};
